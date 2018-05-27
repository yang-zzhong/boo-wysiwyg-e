import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEClear extends BooWysiwygETool {

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
      <iron-iconset-svg size="24" name="bwe-clear">
        <svg><defs>
          <g id="clear"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        title="清除格式" 
        icon="bwe-clear:clear" 
        on-click="_clear"></paper-icon-button>
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

  _clear() {
    this.editor.exec("clear");
  }
}
window.customElements.define("boo-wysiwyg-e-clear", BooWysiwygEClear);
