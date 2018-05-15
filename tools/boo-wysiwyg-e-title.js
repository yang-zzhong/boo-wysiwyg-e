import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class BooWysiwygETitle extends BooWysiwygETool {
  static get template() {
    return html`
    <style>
      paper-item:hover {
        cursor: pointer;
      }
    </style>
    <paper-menu-button>

      <paper-icon-button icon="boo-wysiwyg-e:text-format" title="标题/段落" slot="dropdown-trigger"></paper-icon-button>

      <paper-listbox slot="dropdown-content">
        <paper-item on-click="select"><h1>H1</h1></paper-item>
        <paper-item on-click="select"><h2>H2</h2></paper-item>
        <paper-item on-click="select"><h3>H3</h3></paper-item>
        <paper-item on-click="select"><h4>H4</h4></paper-item>
        <paper-item on-click="select"><h5>H5</h5></paper-item>
        <paper-item on-click="select"><h6>H6</h6></paper-item>
        <paper-item on-click="select"><p>P</p></paper-item>
      </paper-listbox>
    </paper-menu-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-title"; }

  select(e) {
    this.editor.focus();
    let value = e.target.textContent;
    document.execCommand("formatBlock", false, value);
  }
}
window.customElements.define(BooWysiwygETitle.is, BooWysiwygETitle);
