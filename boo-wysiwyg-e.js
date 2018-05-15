import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="boo-wysiwyg-e-tool">
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);

export class BooWysiwygETool extends PolymerElement {
  static get properties() {
    return {
      editor: Object
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
      #editor {
        min-height: 250px;
        padding: 10px;
        overflow: auto;
        border-left: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        @apply --boo-wysiwyg-e-editor;
      }
      #editor code {
        background-color: #f0f0f0;
        padding: 8px;
        border-radius: 3px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, .15);
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
        position: sticky;
        top: 0px;
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
      </defs></svg>
    </iron-iconset-svg>
    <div id="toolbar"><slot></slot></div>
    <div id="editor" contenteditable></div>
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
    document.addEventListener("selectionchange", function(e) {
      let selection = this.shadowRoot.getSelection();
      if (selection.rangeCount > 0) {
        this._range = selection.getRangeAt(0);
      }
    }.bind(this));
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
  }

  curBlock() {
  
  }

  curElem() {
  
  }

  _placeholderChanged(placeholder) {
    this.$.editor.setAttribute('placeholder', placeholder);
  }
}

window.customElements.define(BooWysiwygE.is, BooWysiwygE);
