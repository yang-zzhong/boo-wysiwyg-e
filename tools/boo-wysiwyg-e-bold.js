import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class BooWysiwygEBold extends BooWysiwygETool {
  static get template() {
    return html`
      <paper-icon-button 
        title="加粗" 
        icon="boo-wysiwyg-e:format-bold" on-click="bold"></paper-icon-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-bold"; }
  bold() {
    this.editor.focus();
    document.execCommand("bold");
  }
}
window.customElements.define(BooWysiwygEBold.is, BooWysiwygEBold);
