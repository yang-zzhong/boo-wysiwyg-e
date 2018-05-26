import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import 'boo-land-row/boo-land-row.js';


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
        background-color: white;
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
      }
    </style>
    <iron-iconset-svg size="24" name="boo-wysiwyg-e">
      <svg><defs>
        <g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
        <g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>
        <g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
        <g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
        <g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>
        <g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>
        <g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>
        <g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>
        <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
        <g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12.17c-.74 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33 1.33-.6 1.33-1.33-.59-1.33-1.33-1.33zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>
        <g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>

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
      value: {
        type: String,
        value: "",
        notify: true
      },
      _selection: Object,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.editor.innerHTML = this.value;
    this.$.editor.addEventListener("input", function() {
      this.value = this.$.editor.innerHTML;
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
