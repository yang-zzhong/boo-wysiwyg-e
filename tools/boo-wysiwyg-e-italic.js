import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEItalic extends BooWysiwygETool {

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
      <iron-iconset-svg size="24" name="bwe-italic">
        <svg><defs>
          <g id="italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        active={{italic}}
        toggle
        title="斜体" 
        icon="bwe-italic:italic" 
        on-click="_italic"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      italic: {
        type: Boolean,
        reflectAttribute: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.addEventListener("selectionchange", this._onItalic.bind(this));
  }

  _italic() {
    this.editor.exec("italic");
    this._onItalic();
  }

  _onItalic() {
    this.italic = this.editor.commandState("italic");
  }
}
window.customElements.define("boo-wysiwyg-e-italic", BooWysiwygEItalic);
