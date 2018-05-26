import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class BooWysiwygEUnorderedList extends BooWysiwygETool {
  static get template() {
    return html`
      <paper-icon-button 
        title="无序列表" 
        icon="boo-wysiwyg-e:format-list-bulleted" 
        on-click="orderedList"></paper-icon-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-unordered-list"; }

  orderedList() {
    this.editor.exec("insertUnorderedList");
  }
}
window.customElements.define(BooWysiwygEUnorderedList.is, BooWysiwygEUnorderedList);
