import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEOrderedList extends BooWysiwygETool {
  static get template() {
    return html`
      <iron-iconset-svg size="24" name="bwe-ln">
        <svg><defs>
          <g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        title="有序列表" 
        icon="bwe-ln:format-list-numbered" 
        on-click="orderedList"></paper-icon-button>
    `;
  }

  static get is() { return "boo-wysiwyg-e-ordered-list"; }

  orderedList() {
    this.editor.exec("insertOrderedList");
  }
}
window.customElements.define(BooWysiwygEOrderedList.is, BooWysiwygEOrderedList);
