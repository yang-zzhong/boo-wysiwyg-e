import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEBold extends BooWysiwygETool {

  static get template() {
    return html`
      <style>
        [active] {
          --paper-icon-button: {
            background-color: #e0e0e0;
            border-radius: 50%;
          }
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-bold">
        <svg><defs>
          <g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        active={{bold}}
        toggle
        title="加粗" 
        icon="bwe-bold:format-bold" 
        on-click="_bold"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      bold: {
        type: Boolean,
        reflectAttribute: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.addEventListener("selectionchange", this._onBold.bind(this));
  }

  _bold() {
    this.editor.exec("bold");
    this._onBold();
  }

  _onBold() {
    this.bold = this.editor.commandState("bold");
  }
}
window.customElements.define("boo-wysiwyg-e-bold", BooWysiwygEBold);
