import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class BooWysiwygEOrderedList extends BooWysiwygETool {
  static get template() {
    return html`
      <paper-icon-button 
        title="有序列表" 
        icon="boo-wysiwyg-e:format-list-numbered" 
        on-click="orderedList"></paper-icon-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-ordered-list"; }

  orderedList() {
    this.editor.exec("insertOrderedList");
  }
}
window.customElements.define(BooWysiwygEOrderedList.is, BooWysiwygEOrderedList);
