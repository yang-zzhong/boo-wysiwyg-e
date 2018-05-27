import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-slider/paper-slider.js';
import 'boo-color-selector/boo-color-selector.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

export class BooWysiwygETextColor extends BooWysiwygETool {
  static get template() {
    return html`
      <style>
        [slot=dropdown-content] {
          padding: 10px 15px 10px 10px;
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-color">
        <svg><defs>
          <g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
          <g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-menu-button id="dropdown" ignore-select> 

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

  static get properties() {
    return {
      title: {
        type: String,
        value: "文字颜色"
      },
      icon: {
        type: String,
        value: "bwe-color:format-color-text"
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
window.customElements.define("boo-wysiwyg-e-text-color", BooWysiwygETextColor);
