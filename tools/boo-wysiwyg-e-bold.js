import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
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
      <paper-icon-button 
        active={{bold}}
        toggle
        title="加粗" 
        icon="boo-wysiwyg-e:format-bold" 
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
