import { LitElement, html, css } from 'lit-element';
import RangeHandler from './range/handler'
import {redoIcon} from './icons';
import {sharedStyles} from './shared-styles';

class EditArea extends LitElement {

  static get styles() {
    const style = css`
      :host {
        position: relative;
        display: block;
      }
      ::slotted([contenteditable]) {
        min-height: 100px;
      }
      ::slotted([contenteditable]>*) {
        max-width: 100%;
        overflow-x: auto;
      }
      ::slotted([contenteditable]:focus) {
        outline: none;
      }
      span {
        top: 0px;
        left: 0px;
        position: absolute;
        display: none;
        color: rgba(0, 0, 0, .6);
        z-index: 1;
      }
      :host([empty]) span {
        display: block;
      }
      ::slotted(pre) {
        display: block;
        background-color: #f0f0f0;
        color: black;
        border-radius: 2px;
        padding: 5px;
      }
      .menu {
        position: absolute;
        border: 1px solid #f0f0f0;
        background-color: white;
        border-radius: 5px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);
        top: 0px;
        left: 0px;
        display: none;
        padding: 5px;
        z-index: 10;
      }
      :host([has-menu]) .menu {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 160px;
        flex-wrap: wrap;
      }
    `;

    return [sharedStyles, style];
  }

  render() {
    return html`
      <slot></slot>
      <span>${this.placeholder}</span>
      <div class="menu">
        <div class="icon-btn" title="hello world">
          ${redoIcon}
          <paper-ripple></paper-ripple>
        </div>
        <div class="icon-btn" title="hello world">
          ${redoIcon}
          <paper-ripple></paper-ripple>
        </div>
        <div class="icon-btn" title="hello world">
          ${redoIcon}
          <paper-ripple></paper-ripple>
        </div>
        <div class="icon-btn" title="hello world">
          ${redoIcon}
          <paper-ripple></paper-ripple>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      placeholder: { type: String },
      readonly: { type: Boolean },
      name: {type: String, reflect: true},
      hasMenu: {type: Boolean, reflect: true, attribute: 'has-menu'},
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
    this.placeholder = "请输入内容";
    this.menuNodes = [];
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
    } else if (name ="name" && val) {
      window.boo_wysiwyge_editarea = window.boo_wysiwyge_editarea || {};
      window.boo_wysiwyge_editarea[val] = this;
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.initEvent();
    this.handleEmpty();
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
    ea.addEventListener('input', e => {
      this.saveCurrentRange();
      this.handleEmpty();
      this.maybeShowMenu();
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("input"));
    });
    ea.addEventListener('focusin', e => {
      e.stopPropagation();
      let node = this.currentNode();
      if (!node) {
        this.focus();
        this.exec('formatBlock', 'div');
      }
      this.dispatchEvent(new CustomEvent('focusin'));
    });
    ea.addEventListener('focusout', e => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('focusout'));
    });
    ea.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.onKeyDown('Tab', e => {
      this.exec("inserttext", "\t");
      e.preventDefault();
    });
    ea.addEventListener('click', () => {
      this.maybeShowMenu();
    });
    document.addEventListener('selectionchange', () => {
      this.selectionChanged();
    });
  }

  maybeShowMenu() {
    this.hasMenu = false;
    let node = this.currentNode();
    if (node) {
      let tools = [];
      for(let i = 0; i < this.menuNodes.length; ++i) {
        let tool = this.menuNodes[i];
        let is = tool.is(node);
        if (is) {
          tools.push(is);
        }
      }
      let cur = {tool: null, prior: 1000, node: null};
      for(let i = 0; i < tools.length; ++i) {
        if (tools[i].prior < cur.prior) {
          cur = tools[i];
        }
      }
      if (cur.node) {
        this.showMenu(cur.tool, cur.node);
      }
    }
  }

  showMenu(tool, node) {
    let items = tool.menuItems();
    let menu = this.shadowRoot.querySelector('.menu');
    menu.innerHTML = "";
    for (let i = 0; i < items.length; ++i) {
      let btn = document.createElement('div');
      btn.classList.add('icon-btn');
      btn.setAttribute('title', items[i].title);
      btn.innerHTML = items[i].icon.strings[0];
      let ripple = document.createElement('paper-ripple');
      btn.appendChild(ripple);
      menu.appendChild(btn);
      let onclick = items[i].click;
      btn.addEventListener('click', e => {
        onclick(node);
      });
    }
    let pos = this.nodePos(node);
    menu.style.left = pos.x + 'px';
    menu.style.top = pos.y + node.getBoundingClientRect().height + 'px';
    this.hasMenu = true;
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
    let getShadowNode = () => {
      let node = this;
      for (; node; node = node.parentNode) {
        if (node.toString() === "[object ShadowRoot]") {
          return node;
        }
      }
      return null;
    }
    let node = getShadowNode();
    if (node && node.getSelection) {
      return node.getSelection();
    } else if (window.getSelection) {
      return window.getSelection();
    } else {
      return document.getSelection();
    }
  }

  offset() {
    return this.offsetSelectedStart();
  }

  selectNode(node) {
    let range = document.createRange();
    range.selectNode(node);
    this.select(range);
  }

  selectCurrent() {
    return this.select(this.selected());
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

  focus() {
    this.area().focus();
  }

  currentNode() {
    let range = this.selected();
    if (!range) {
      return;
    }
    return range.startContainer;
    // let node = this._validPreNode(range.startContainer);
    // if (!node) {
    //   node = range.startContainer.parentNode;
    // }
    // if (node == this.area() || !node.getBoundingClientRect) {
    //   return;
    // }
    // return node;
  }

  _validPreNode(node) {
    // 最多找前三个节点
    let i = 0;
    while (node && !node.getBoundingClientRect) {
      if (i++ > 0) {
        return node;
      }
      node = node.previousSibling;
    }

    return node;
  }

  countBefore(node) {
    let n = node;
    let len = 0;
    let ea = this;
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
    node = node || this;
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
    const content = this;
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
    this.handleEmpty();
  }

  handleEmpty() {
    if (this.empty()) {
      this.setAttribute('empty', true);
    } else {
      this.removeAttribute('empty');
    }
  }

  empty() {
    let content = this.area().innerHTML.replace('<br>', '').trim();
    return content.length == 0;
  }

  content() {
    this.area().querySelectorAll('script').forEach(s => {
      s.parentNode.removeChild(s);
    });
    return this.area().innerHTML;
  }

  _placeholderChanged(placeholder) {
    setTimeout(() => {
      this.setAttribute('placeholder', placeholder);
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

  area() {
    return this.querySelector('[contenteditable]');
  }

  _readonlyChanged(readonly) {
    let area = this.area();
    if (readonly) {
      area.removeAttribute('contenteditable');
    } else {
      area.setAttribute('contenteditable', true);
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

　nodePos(node){
    let x = node.offsetLeft;
    let y = node.offsetTop;
　　let current = node.offsetParent;
　　while (current != this) {
　　　x += current.offsetLeft;
　　　y += current.offsetTop;
　　　current = current.offsetParent;
　　}
    return {x: x, y: y};
　}

}

window.customElements.define('boo-wysiwyg-editarea', EditArea);
