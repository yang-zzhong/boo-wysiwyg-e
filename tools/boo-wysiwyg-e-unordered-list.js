import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEUnorderedList extends BooWysiwygETool {
  static get template() {
    return html`
      <iron-iconset-svg size="24" name="bwe-lb">
        <svg><defs>
          <g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12.17c-.74 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33 1.33-.6 1.33-1.33-.59-1.33-1.33-1.33zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        title="无序列表" 
        icon="bwe-lb:format-list-bulleted" 
        on-click="orderedList"></paper-icon-button>
    `;
  }

  static get is() { return "boo-wysiwyg-e-unordered-list"; }

  orderedList() {
    this.editor.exec("insertUnorderedList");
  }
}
window.customElements.define(BooWysiwygEUnorderedList.is, BooWysiwygEUnorderedList);
