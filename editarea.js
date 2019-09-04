import { LitElement, html, css } from 'lit-element';
import RangeHandler from './range/handler'
import {sharedStyles} from './shared-styles';
import {Selection} from './selection';
import '@material/mwc-ripple';

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
        left:r 0px;
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
      .menu .sep {
        width: 1px;
        background-color: gray;
        margin: 0px 15px;
        height: 20px;
      }
    `;

    return [sharedStyles, style];
  }

  render() {
    return html`
      <slot></slot>
      <div class="menu"></div>
    `;
  }

  static get properties() {
    return {
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
    ea.addEventListener('input', e => {
      this.hasMenu = false;
      this.handleEmpty();
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
    ea.addEventListener('click', e => { this.maybeShowMenu(e); });
    this._selection = new Selection(this.area(), () => {
      return this.selectionChanged();
    });
  }

  maybeShowMenu(e) {
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
        return this.showMenu(tools, e);
      }
      this.hasMenu = false;
    }
  }

  showMenu(tools, e) {
    let menu = this.shadowRoot.querySelector('.menu');
    menu.innerHTML = "";
    for (let j = 0; j < tools.length; ++j) {
      let items = tools[j].tool.menuItems();
      for (let i = 0; i < items.length; ++i) {
        let btn = document.createElement('div');
        btn.classList.add('icon-btn');
        btn.setAttribute('title', items[i].title);
        btn.innerHTML = items[i].icon.strings[0];
        let ripple = document.createElement('mwc-ripple');
        btn.appendChild(ripple);
        menu.appendChild(btn);
        let onclick = items[i].click;
        (function(btn, node) {
          btn.addEventListener('click', e => {
            onclick(node);
          });
        })(btn, tools[j].node);
      }
      if (j < tools.length - 1) {
        let sep = document.createElement('div');
        sep.classList.add('sep');
        menu.appendChild(sep);
      }
    }
    let pos = this.nodePos(this, document);
    let epos = this.getMousePos(e);
    menu.style.left = (epos.x - pos.x) + 'px';
    menu.style.top = (epos.y - pos.y) + 'px';
    this.hasMenu = true;
  }

  getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return { x: x, y: y };
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

  offset() {
    return this.offsetSelectedStart();
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
    let ps = [];
    this._selectionObservers.forEach(o => {
      let p = o.handleSelectionChanged();
      if (p) {
        ps.push(p);
      }
    });
    if (ps.length > 0) {
      return Promise.all(p);
    }
  }

  focus() {
    this.area().focus();
    this._selection.restore();
  }

  selected() {
    return this._selection.selected();
  }

  currentNode() {
    let range = this._selection.selected();
    if (!range) {
      return;
    }
    return range.startContainer;
  }

  selectNode(n) {
    this._selection.selectNode(n);
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
    this._selection.onTextNode(e, tn => {
      t += tn.nodeValue; 
      return false;
    });
    return t;
  }

  exec(command, arg){
    let range = this._selection.selected();
    if (range) {
      new RangeHandler(range).execCommand(command, arg);
    }
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

　nodePos(node, end) {
    let x = node.offsetLeft;
    let y = node.offsetTop;
　　let current = node.offsetParent;
　　while (current != null && current != end) {
　　　x += current.offsetLeft;
　　　y += current.offsetTop;
　　　current = current.offsetParent;
　　}
    return {x: x, y: y};
　}

}

window.customElements.define('boo-wysiwyg-editarea', EditArea);
