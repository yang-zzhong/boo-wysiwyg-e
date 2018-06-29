import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import 'boo-land-row/boo-land-row.js';
import "./highlight/theme/default.js";


const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="boo-wysiwyg-e-tool"></dom-module>`;

document.head.appendChild($_documentContainer.content);

export class BooWysiwygETool extends PolymerElement {
  static get properties() {
    return {
      editor: Object,
      disabled: {
        type: Boolean,
        reflectAttribute: true
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    let node = this;
    while(node = node.parentNode) {
      if (node.tagName == 'BOO-WYSIWYG-E') {
        this.editor = node;
        break;
      }
    }
    if (!this.editor) {
      throw "editor not found";
    }
  }
}

/**
 * `boo-wysiwyg-e`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooWysiwygE extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host(:focus) {
          outline: none;
        }
        #editorContainer {
          @apply --boo-wysiwyg-e-wrapper;
        }
        #editor {
          min-height: 250px;
          padding: 10px;
          overflow: auto;
          border-left: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
          border-right: 1px solid #f0f0f0;
          @apply --boo-wysiwyg-e-editor;
        }
        #editor:focus {
          outline: none;
        }
        #editor[contenteditable=true]:empty:before {
          content: attr(placeholder);
          display: block;
          opacity: .6;
        }
        #toolbar {
          background-color: inherit;
          border: 1px solid #f0f0f0;
          width: 100%;
          box-sizing: border-box;
          @apply --boo-wysiwyg-e-toolbar;
          position: sticky;
          top: 0px;
        }
        boo-land-row {
          --boo-land-row-to-left: {
            top: 12px;
          }
          --boo-land-row-to-right: {
            top: 12px;
          }
          z-index: 1000000;
        }
      </style>
      <iron-iconset-svg size="24" name="boo-wysiwyg-e">
        <svg><defs>
          <g id="to-left"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></g>
          <g id="to-right"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <boo-land-row id="toolbar">
        <paper-icon-button slot="to-left" icon="boo-wysiwyg-e:to-left"></paper-icon-button>
        <div slot="content">
          <slot></slot>
        </div>
        <paper-icon-button slot="to-right" icon="boo-wysiwyg-e:to-right"></paper-icon-button>
      </boo-land-row>
      <div id="editorContainer">
        <div id="codeTheme"><div id="___themeContent"></div></div>
        <div id="editor" contenteditable></div>
      </div>
    `;
  }

  static get is() { return 'boo-wysiwyg-e'; }
  static get properties() {
    return {
      noAutoGrow: Boolean,
      placeholder: {
        type: String,
        observer: "_placeholderChanged",
        value: ""
      },
      codeTheme: {
        type: String,
        value: "default",
        observer: "_codeThemeChanged"
      },
      _theme: String,
      _selection: Object,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.editor.addEventListener("input", function() {
      this.dispatchEvent(new CustomEvent("input"));
    }.bind(this));
    this.$.editor.addEventListener("keydown", this._defaultKeyListener.bind(this));
    document.addEventListener("selectionchange", function(e) {
      let selection = this.shadowRoot.getSelection();
      if (selection.rangeCount > 0) {
        this._range = selection.getRangeAt(0);
      }
      this.dispatchEvent(new CustomEvent("selectionchange"));
    }.bind(this));
    setTimeout(function() {
      this.$.toolbar.update();
    }.bind(this), 1000);
  }

  restoreSelection() {
    if (!this._range) {
      return;
    } 
    let selection = this.shadowRoot.getSelection();
    selection.removeAllRanges();
    selection.addRange(this._range);
  }

  focus() {
    this.$.editor.focus();
    this.restoreSelection();
    this.dispatchEvent(new CustomEvent("focus"));
  }

  exec(command, param) {
    this.focus();
    document.execCommand(command, false, param);
  }

  commandState(command) {
    return document.queryCommandState(command);
  }

  deleteWord() {
    this.selectWord();
    this.exec("delete");
  }

  selectWord(forward) {
    if (!forward) {
      forward = true;
    }
    let range = this.findWordInContainer(forward);
    this._range = range;
    this.restoreSelection();
  }

  forwardWord() {
    let range = this.findWord(true);
    this._range = range;
    this._range.collapse(false);
    this.restoreSelection();
  }

  backwardWord() {
    let range = this.findWord(false);
    this._range = range;
    this._range.collapse(true);
    this.restoreSelection();
  }

  findWordInContainer(forward) {
    let range = this._range.cloneRange();
    let node = this._selectedRangeStartTextNode();
    if (!node) {
      return range;
    }
    let start = forward ? this._range.startOffset : Math.max(this._range.startOffset - 1, 0);
    while(node.data[forward ? start : start - 1] == " ") {
      forward ? start++ : start--;
    }
    let end = start;
    while(start > 0) {
      if (node.data[start - 1] == " ") {
        break;
      }
      start--;
    }
    while(end < node.data.length) {
      if (node.data[end] == " ") {
        break;
      }
      end++;
    }
    range.setStart(node, start);
    range.setEnd(node, end);
    return range;
  }

  content() {
    let ct = this.$.codeTheme.innerHTML.replace(/[\n\t]/g, '');
    return String(ct + this.$.editor.innerHTML);
  }

  setContent(content) {
    if (content) {
      let reg = /(\<div id=\"___themeContent\"\>.*\<\/div\>)/g;
      let style = content.match(reg)[0];
      if (style) {
        this.$.___themeContent.innerHTML = style
          .replace(/\<div id=\"___themeContent\"\>/, '')
          .replace(/\<\/div\>/, '');
      }
      this.$.editor.innerHTML = content.replace(reg, '');
    }
  }

  _codeThemeChanged(name) {
    let imported = null;
    switch(name) {
      case "atom-one-light":
        imported = import("./highlight/theme/atom-one-light.js");
        break;
      case "default":
        imported = import("./highlight/theme/default.js");
        break;
      case "github":
        imported = import("./highlight/theme/github.js");
        break;
      case "kustom-dark":
        imported = import("./highlight/theme/kustom-dark.js");
        break;
      case "kustom-light":
        imported = import("./highlight/theme/kustom-light.js");
        break;
      case "one-dark":
        imported = import("./highlight/theme/one-dark.js");
        break;
      case "solarized-dark":
        imported = import("./highlight/theme/solarized-dark.js");
        break;
      case "solarized-light":
        imported = import("./highlight/theme/solarized-light.js");
        break;
      default:
        imported = import("./highlight/theme/default.js");
    };
    imported.then(function(res) {
      this.$.___themeContent.innerHTML = res.booEditorCodeTheme.innerHTML;
    }.bind(this));
  }

  _selectedRangeStartTextNode() {
    let node = this._range.startContainer;
    if (node.nodeType == 3) {
      return node;
    }
    return this.findTextNode(node)[0];
  }

  _rightSearchStart(textNodes, node, forward, sep) {
    let start = forward ? this._range.startOffset : Math.max(this._range.startOffset - 1, 0);
    let startIndex = textNodes.indexOf(node);
    while(startIndex < textNodes.length && startIndex > -1) {
      node = textNodes[startIndex];
      let found = false;
      while (start < node.data.length && start >= 0) {
        if (node.data[start] != sep) {
          found = true;
          break;
        }
        forward ? start++ : start--;
      }
      if (found) {
        break;
      }
      forward ? startIndex++ : startIndex--;
    }
    return [startIndex, start];
  }

  _searchWordBegin(textNodes, startIndex, start, sep) {
    let node = null;
    while(startIndex >= 0 && startIndex < textNodes.length) {
      node = textNodes[startIndex];
      let found = false;
      while(start > 0) {
        if (node.data[start - 1] == sep) {
          found = true;
          break;
        }
        start--;
      }
      if (found) {
        break;
      }
      if (startIndex > 0) {
        start = textNodes[startIndex].length - 1;
      }
      startIndex--;
    }
    return [node, start];
  }

  _searchWordEnd(textNodes, endIndex, end, sep) {
    let node = null;
    while(endIndex < textNodes.length && endIndex > -1) {
      node = textNodes[endIndex];
      let found = false;
      while(end < node.data.length) {
        if (node.data[end] == sep) {
          found = true;
          break;
        }
        end++;
      }
      if (found) {
        break;
      }
      if (endIndex < textNodes.length - 1) {
        end = 0;
      }
      endIndex++;
    }

    return [node, end];
  }

  findWord(forward) {
    return this.findBetween(forward, " ");
  }

  findBetween(forward, sep) {
    let textNodes = this.findTextNode();
    let node = this._selectedRangeStartTextNode();
    let range = this._range.cloneRange();
    if (!node) {
      return range;
    }
    let pos = this._rightSearchStart(textNodes, node, forward, sep);
    let nodeStart = this._searchWordBegin(textNodes, pos[0], pos[1], sep);
    if (nodeStart[0]) {
      range.setStart(nodeStart[0], nodeStart[1]);
    }
    let nodeEnd = this._searchWordEnd(textNodes, pos[0], pos[1], sep);
    if (nodeEnd[0]) {
      range.setEnd(nodeEnd[0], nodeEnd[1]);
    }
    return range;
  }

  findTextNode(node) {
    let textNodes = [];
    if (!node) {
      node = this.$.editor;
    }
    for (let i = 0; i < node.childNodes.length; i++) {  
      var c = node.childNodes[i];
      switch(c.nodeType) {  
        case 1:  
          textNodes = textNodes.concat(this.findTextNode(c));
          break;
        case 3:  
          textNodes.push(c);
          break;  
      }  
    }
    return textNodes;
  }

  _placeholderChanged(placeholder) {
    this.$.editor.setAttribute('placeholder', placeholder);
  }

  _defaultKeyListener(e) {
    switch (e.key) {
      case "Tab":
        this.exec("inserttext", "    ");
        e.preventDefault();
        break;
      case "Enter":
        this._handleEnter(e);
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

  _handleEnter(e) {
    let maxDepth = 3;
    let depth = 0;
    let node = this._range.startContainer;
    while(node && depth < maxDepth) {
      if (node.tagName == 'CODE') {
        this.exec("inserttext", '\n');
        e.preventDefault();
        return;
      }
      node = node.parentNode;
    }
  }
}

window.customElements.define(BooWysiwygE.is, BooWysiwygE);
