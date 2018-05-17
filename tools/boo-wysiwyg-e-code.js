import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class BooWysiwygECode extends BooWysiwygETool {
  static get template() {
    return html`
      <paper-icon-button 
        title="插入代码" 
        icon="boo-wysiwyg-e:code" on-click="code"></paper-icon-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-code"; }

  code() {
    this.editor.exec("inserthtml", "<pre><code>code</code></pre>");
    this.editor.selectWord(false);
  }
}
window.customElements.define(BooWysiwygECode.is, BooWysiwygECode);
