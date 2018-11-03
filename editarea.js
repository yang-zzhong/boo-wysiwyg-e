import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {Keyboard} from './keyboard.js';

class EditArea extends PolymerElement {

  static get template() {
    return html`
      <style include="boo-wysiwyg-styles">
        :host {
          display: block;
        }
        #editArea {
          width: 100%;
          min-height: 300px;
          display: block;
          @apply --boo-wysiwyg-editarea;
        }
        #editArea:focus {
          outline: none;
        }
        #editArea:empty:before {
          content: attr(placeholder);
          display: block;
          opacity: .6;
          @apply --boo-wysiwyg-placeholder;
        }
        #editArea pre {
          display: block;
          background-color: rgb(109, 76, 65);
          color: white;
          border-radius: 2px;
          padding: 5px;
          @apply --boo-wysiwyg-pre;
        }
      </style>
      <div id="editArea" contenteditable></div>
    `;
  }

  static get properties() {
    return {
      placeholder: {
        type: String,
        reflectToAttribute: true,
        observer: "_placeholderChanged",
        value: ""
      },
      focused: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true
      },
      readonly: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        observer: '_readonlyChanged',
      },
      enableAbsolutePositionEditor: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        observer: "_enableAbsolutePositionEditorChanged"
      },
      enableInlineTableEditing: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        observer: "_enableInlineTableEditingChanged"
      },
      defaultParagraphSeparator: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        observer: "_defaultParagraphSeparatorChanged"
      },
      styleWithCss: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        observer: "_styleWithCSSChanged"
      },
      scrollTarget: {
        type: Object,
        observer: "_scrollTargetChanged"
      },
      _selectionObservers: {
        type: Array,
        value: [],
      },
      _keyDownHandlers: {
        type: Object,
        value: {}
      },
      _currentRange: Object,
      _inputObservers: {
        type: Array,
        value: []
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.editArea.addEventListener("input", e => {
      this.dispatchEvent(new CustomEvent('input'));
    });
    this.$.editArea.addEventListener("focusin", e => {
      this.focused = true;
    });
    this.$.editArea.addEventListener("focusout", e => {
      this.focused = false;
    });
    document.addEventListener("selectionchange", e => {
      this._selectionObservers.forEach(o => o.handleSelectionChanged());
      if (this.selection().rangeCount == 0) {
        return;
      }
      this._currentRange = this.selection().getRangeAt(0);
      this.dispatchEvent(new CustomEvent('selectionchange'));
    });
    this.$.editArea.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.onKeyDown('Tab', function(e) {
        this.exec("inserttext", "\t");
        e.preventDefault();
    });
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

  index() {
    let root = {weight: 0, children: []};
    this.$.editArea.querySelectorAll('h1,h2,h3,h4').forEach((node) => {
      let id = "a" + Math.random().toString(36).substr(2);
      node.setAttribute("id", id);
      let item = {
        id: id,
        title: node.textContent,
        weight: parseInt(node.tagName.substr(1,1)),
        children: []
      };
      if (item.title.trim() == "") {
        return;
      }
      this.insertIndex(root, item);
    });

    return root.children;
  }

  insertIndex(root, item) {
    let len = root.children.length - 1;
    if (root.children.length == 0 || root.weight == item.weight - 1) {
      root.children.push(item);
      return;
    }
    if (root.children[len].weight >= item.weight) {
      root.children.push(item);
      return;
    }
    this.insertIndex(root.children[len], item);
  }

  selection() {
    if (this.shadowRoot.getSelection) {
      return this.shadowRoot.getSelection();
    } else if (window.getSelection) {
      return window.getSelection();
    }
  }

  offset() {
    return this.offsetSelectedStart();
  }

  selectCurrent() {
    return this.select(this.selected());
  }

  focus() {
    this.$.editArea.focus();
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

  update() {
    this._selectionObservers.forEach(o => o.handleSelectionChanged());
  }

  countBefore(node) {
    let n = node;
    let len = 0;
    if (node == undefined || node == this.$.editArea) {
      return 0;
    }
    while((node = node.previousSibling) != null) {
      n = node;
      len += this.text(node).length;
    }
    if (n.parentNode != this.$.editArea) {
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
    node = node || this.$.editArea;
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
    if (this.selection().rangeCount == 0) {
      return;
    }
    return this._currentRange = this.selection().getRangeAt(0);
  }

  exec(command, params) {
    document.execCommand(command, false, params);
    return this;
  }

  setContent(content) {
    this.$.editArea.innerHTML = content;
  }

  content() {
    return this.$.editArea.innerHTML;
  }

  _placeholderChanged(placeholder) {
    this.$.editArea.setAttribute('placeholder', placeholder);
  }

  _enableAbsolutePositionEditorChanged() {
    this._feature('enableAbsolutePositionEditor');
  }

  _enableInlineTableEditingChanged() {
    this._feature('enableInlineTableEditing');
  }

  _defaultParagraphSeparatorChanged(sep) {
    this.focus().exec('defaultParagraphSeparator', sep);
  }

  _styleWithCSSChanged() {
    this._feature('styleWithCSS');
  }

  _readonlyChanged(readonly) {
    if (readonly) {
      this.$.editArea.removeAttribute('contenteditable');
    } else {
      this.$.editArea.setAttribute('contenteditable', true);
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
