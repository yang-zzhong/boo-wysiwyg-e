import { LitElement, html, css } from 'lit-element';
import RangeHandler from './range/handler'

class EditArea extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }
      [name=area] {
        width: 100%;
        min-height: var(--boo-wysiwyg-editarea-min-height, 100px);
        display: block;
      }
      [name=area]>* {
        max-width: 100%;
        overflow-x: auto;
      }
      [name=area]:focus {
        outline: none;
      }
      [name=area]:empty:before {
        content: attr(placeholder);
        display: block;
        opacity: .6;
      }
      [name=area] pre {
        display: block;
        background-color: rgb(109, 76, 65);
        color: white;
        border-radius: 2px;
        padding: 5px;
      }
    `;
  }

  render() {
    return html`
      <div name="area" contenteditable></div>
    `;
  }

  static get properties() {
    return {
      placeholder: { type: String },
      focused: { type: Boolean },
      readonly: { type: Boolean },
      name: {type: String, reflect: true},
      _selectionObservers: { type: Array },
      _keyDownHandlers: { type: Object },
      _currentRange: Object,
      _inputObservers: { type: Array }
    };
  }

  constructor() {
    super();
    this._selectionObservers = [];
    this._keyDownHandlers = [];
    this._inputObservers = [];
  }

  attributeChangedCallback(name, old, val) {
    super.attributeChangedCallback(name, old, val);
    if (name == 'absolute-position-editor' && val) {
      this._feature('enableAbsolutePositionEditor');
    } else if (name == 'inline-table-editing') {
      this._feature('enableInlineTableEditing');
    } else if (name == 'default-paragraph-separator') {
      this.focus().exec('defaultParagraphSeparator', val);
    } else if (name == 'style-with-css') {
      this._feature('styleWithCSS');
    } else if (name == 'readonly') {
      this._readonlyChanged(val);
    } else if (name == 'placeholder') {
      this._placeholderChanged(val);
    } else if (name ="name") {
      window.boo_wysiwyge_editarea = window.boo_wysiwyge_editarea || {};
      window.boo_wysiwyge_editarea[val] = this;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.initEvent(), 200);
  }

  initEvent() {
    let ea = this.area();
    ea.addEventListener('mouseup', () => {
      this.saveCurrentRange();
    }, false);
    ea.addEventListener('keyup', () => {
      this.saveCurrentRange();
    }, false)
    ea.addEventListener('mouseout', (e) => {
      if (e.target === ea) {
        this.saveCurrentRange();
      }
    }, false);
    this.touchHandler = (e) => {
      if (ea.contains(e.target)) {
        this.saveCurrentRange();
      }
    }
    window.addEventListener('touchend', this.touchHandler, false)
    ea.addEventListener("input", e => {
      this.dispatchEvent(new CustomEvent('input'));
    });
    ea.addEventListener("focusin", e => {
      this.dispatchEvent(new CustomEvent('focusin'));
      this.focused = true;
    });
    ea.addEventListener("focusout", e => {
      this.dispatchEvent(new CustomEvent('focusout'));
      this.focused = false;
    });
    ea.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.onKeyDown('Tab', e => {
      this.exec("inserttext", "\t");
      e.preventDefault();
    });
    document.addEventListener('selectionchange', () => {
      this.selectionChanged();
    });
  }

  area() {
    return this.shadowRoot.querySelector('[name=area]');
  }

  onKeyDown(key, callback) {
    this._keyDownHandlers[key] = callback;
    return this;
  }

  addSelectionObserver(node) {
    if (node.handleSelectionChanged) {
      this._selectionObservers.push(node);
    }
  }

  selection() {
    if (this.shadowRoot.getSelection) {
      return this.shadowRoot.getSelection();
    } else if (window.getSelection) {
      return window.getSelection();
    } else {
      return document.getSelection();
    }
  }

  offset() {
    return this.offsetSelectedStart();
  }

  selectCurrent() {
    return this.select(this.selected());
  }

  focus() {
    this.area().focus();
    return this;
  }

  offsetSelectedStart() {
    return this._offset(true);
  }

  offsetSelectedEnd() {
    return this._offset(false);
  }

  _offset(toStart) {
    if (this.selection().rangeCount == 0) {
      return 0;
    }
    let range = this.selection().getRangeAt(0);
    range.collapse();
    let node = toStart ? range.startContainer : range.endContainer;
    let offset = toStart ? range.startOffset : range.endOffset;
    return offset + this.countBefore(node);
  }

  selectionChanged() {
    this._selectionObservers.forEach(o => o.handleSelectionChanged());
  }

  countBefore(node) {
    let n = node;
    let len = 0;
    let ea = this.area();
    if (node == undefined || node == ea) {
      return 0;
    }
    while((node = node.previousSibling) != null) {
      n = node;
      len += this.text(node).length;
    }
    if (n.parentNode != ea) {
      len += this.countBefore(n.parentNode);
    }

    return len;
  }

  text(e) {
    let t = "";
    let cn = e.childNodes;
    for(let j = 0; j < cn.length; j++) {
      t += cn[j].nodeType != 1 ? cn[j].nodeValue : this.text(cn[j]);
    }

    return t;
  }

  seek(offset, node) {
    node = node || this.area();
    let cn = node.childNodes;
    for(let i = 0; i < cn.length; i++) {
      if (cn[i].nodeType == 1) {
        offset = this.seek(offset, cn[i]);
        if (offset <= 0) {
          return offset;
        }
        continue;
      }
      if (offset <= cn[i].nodeValue.length) {
        let range = new Range();
        range.setStart(cn[i], offset);
        range.setEnd(cn[i], offset);
        this.select(range);
        return offset;
      }
      offset -= cn[i].nodeValue.length;
    }

    return offset;
  }

  select(range) {
    this.selection().removeAllRanges();
    this.selection().addRange(range);
    return this;
  }

  selected() {
    if (this._currentRange) {
      return this._currentRange;
    }
    this.saveCurrentRange();
    return this._currentRange;
  }

  exec(command, arg){
    this.restoreSelection();
    if (this._currentRange) {
      new RangeHandler(this._currentRange).execCommand(command, arg);
    }
  }

  saveCurrentRange(){
    const selection = this.selection();
    if (selection.rangeCount < 1) {
      return;
    }
    const content = this.area();
    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(0);
      let start = range.startContainer;
      let end = range.endContainer;
      // for IE11 : node.contains(textNode) always return false
      start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
      end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;
      if (content.contains(start) && content.contains(end)) {
        this._currentRange = range;
        break;
      }
    }
  }

  restoreSelection(){
    const selection = this.selection();
    selection.removeAllRanges();
    if (this._currentRange) {
      selection.addRange(this._currentRange);
      return;
    }
    const content = this.area();
    const div = document.createElement('div');
    const range = document.createRange();
    content.appendChild(div);
    range.setStart(div, 0);
    range.setEnd(div, 0);
    selection.addRange(range);
    this._currentRange = range;
  }

  setContent(content) {
    let ea = this.area();
    ea.innerHTML = content;
  }

  content() {
    let ea = this.area();
    return ea.innerHTML;
  }

  _placeholderChanged(placeholder) {
    setTimeout(() => {
      this.area().setAttribute('placeholder', placeholder);
    }, 200);
  }

  _enableAbsolutePositionEditorChanged() {
    this._feature('');
  }

  _enableInlineTableEditingChanged() {
    this._feature('');
  }

  _defaultParagraphSeparatorChanged(sep) {
  }

  _styleWithCSSChanged() {
  }

  _readonlyChanged(readonly) {
    if (readonly) {
      this.area().removeAttribute('contenteditable');
    } else {
      this.area().setAttribute('contenteditable', true);
    }
  }

  _feature(c) {
    this.focus().exec(c);
  }

  _handleKeyDown(e) {
    let handler = this._keyDownHandlers[this._key(e)];
    if (handler) {
      return handler.call(this, e);
    }
  }

  _key(e) {
    let key = [];
    if (e.ctrlKey) {
      key.push('Ctrl');
    }
    if (e.shiftKey) {
      key.push('Shift');
    }
    key.push(e.key);

    return key.join("+");
  }
}

window.customElements.define('boo-wysiwyg-editarea', EditArea);
