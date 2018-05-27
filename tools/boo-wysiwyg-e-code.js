import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygECode extends BooWysiwygETool {
  static get template() {
    return html`
      <iron-iconset-svg size="24" name="bwe-code">
        <svg><defs>
          <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-icon-button 
        title="插入代码" 
        icon="bwe-code:code" 
        on-click="code"></paper-icon-button>
    `;
  }

  static get is() { return "boo-wysiwyg-e-code"; }

  code() {
    this.editor.exec("formatblock", "pre");
  }
}
window.customElements.define(BooWysiwygECode.is, BooWysiwygECode);
