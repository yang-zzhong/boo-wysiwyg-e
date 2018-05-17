import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-slider/paper-slider.js';
import 'boo-color-selector/boo-color-selector.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
export class BooWysiwygETextColor extends BooWysiwygETool {
  static get template() {
    return html`
    <style>
      [slot=dropdown-content] {
        padding: 10px 15px 10px 10px;
      }
    </style>
    <paper-menu-button id="dropdown" ignore-select=""> 

      <paper-icon-button slot="dropdown-trigger" title="[[title]]" icon="[[icon]]"></paper-icon-button>

      <div slot="dropdown-content">
        <boo-color-selector 
          color={{value}}
          colors={{values}}
          on-selected="select"></boo-color-selector>
      </div>
  </paper-menu-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-text-color"; }

  static get properties() {
    return {
      title: {
        type: String,
        value: "文字颜色"
      },
      icon: {
        type: String,
        value: "boo-wysiwyg-e:format-color-text"
      },
      value: {
        type: String,
        notify: true,
      },
      values: {
        type: Array,
        value: []
      }
    };
  }

  select() {
    if (this.editor) {
      this.editor.exec("forecolor", this.value);
      this.$.dropdown.close();
    }
  }
}
window.customElements.define(BooWysiwygETextColor.is, BooWysiwygETextColor);
