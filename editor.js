import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class Editor extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #editArea {
          width: 100%;
          min-height: 300px;
          display: block;
        }
        #editArea:focus {
          outline: none;
        }
        #editArea:empty:before {
          content: attr(placeholder);
          display: block;
          opacity: .6;
        }
        #editArea pre {
          display: block;
          background-color: rgb(109, 76, 65);
          color: white;
          border-radius: 2px;
          padding: 5px;
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
      readonly: {
        type: Boolean,
        reflectToAttribute: true,
        observer: '_readonlyChanged',
      },
      enableAbsolutePositionEditor: {
        type: Boolean,
        reflectToAttribute: true,
        observer: "_enableAbsolutePositionEditorChanged"
      },
      enableInlineTableEditing: {
        type: Boolean,
        reflectToAttribute: true,
        observer: "_enableInlineTableEditingChanged"
      },
      defaultParagraphSeparator: {
        type: String,
        reflectToAttribute: true,
        observer: "_defaultParagraphSeparatorChanged"
      },
      styleWithCSS: {
        type: String,
        reflectToAttribute: true,
        observer: "_styleWithCSSChanged"
      },
      formats: {
        type: Object,
        value: {},
      },
      value: {
        type: String,
        notify: true,
        observer: "_valueChanged"
      },
      scrollTarget: {
        type: Object,
        observer: "_scrollTargetChanged"
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.editArea.addEventListener("input", e => {
      this.value = this.$.editArea.innerHTML;
    });
    document.addEventListener("selectionchange", e => {
      this.update();
    });
    this.$.editArea.addEventListener("keydown", this._defaultKeyListener.bind(this));
  }

  register(format, node) {
    this.formats[format] = node;
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
    if (this.selection().rangeCount == 0) {
      return;
    }

    return this.selection().getRangeAt(0);
  }

  exec(command, params) {
    document.execCommand(command, false, params);
    return this;
  }

  update() {
    for(let command in this.formats) {
      this.formats[command].value = document.queryCommandState(command);
    }
  }

  _valueChanged(val, oldVal) {
    if (oldVal != null) {
      return;
    }
    let offset = this.focus().offset();
    this.$.editArea.innerHTML = val;
    this.seek(offset);
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

  _defaultKeyListener(e) {
    switch (e.key) {
      case "Tab":
        this.exec("inserttext", "\t");
        e.preventDefault();
        break;
      case "Delete":
      case "Backspace":
        if (!e.ctrlKey) {
          return;
        }
        this.deleteWord();
        e.preventDefault();
        break;
      case "ArrowRight":
        if (!e.ctrlKey) {
          return;
        }
        this.forwardWord();
        e.preventDefault();
        break;
      case "ArrowLeft":
        if (!e.ctrlKey) {
          return;
        }
        this.backwardWord();
        e.preventDefault();
        break;
    }
  }
}

window.customElements.define('boo-wysiwyg-e-editor', Editor);
