import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygERedo extends BooWysiwygETool {

  static get template() {
    return html`
      <iron-iconset-svg size="24" name="bwe-redo">
        <svg><defs>
          <g id="redo">
            <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path>
          </g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        title="重做" 
        icon="bwe-redo:redo" 
        on-click="_redo"></paper-icon-button>
    `;
  }

  static get properties() {
    return {};
  }

  _redo() {
    this.editor.exec("redo");
  }
}
window.customElements.define("boo-wysiwyg-e-redo", BooWysiwygERedo);
