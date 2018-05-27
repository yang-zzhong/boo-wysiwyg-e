import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEUndo extends BooWysiwygETool {

  static get template() {
    return html`
      <iron-iconset-svg size="24" name="bwe-undo">
        <svg><defs>
          <g id="undo">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path>
          </g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        title="撤销" 
        icon="bwe-undo:undo" 
        on-click="_undo"></paper-icon-button>
    `;
  }

  static get properties() {
    return {};
  }

  _undo() {
    this.editor.exec("undo");
  }
}
window.customElements.define("boo-wysiwyg-e-undo", BooWysiwygEUndo);
