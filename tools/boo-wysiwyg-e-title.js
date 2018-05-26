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

        <paper-icon-button 
          icon="boo-wysiwyg-e:text-format" 
          title="标题/段落" 
          slot="dropdown-trigger"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template is="dom-repeat" items=[[blocks]]>
            <paper-item on-click="select">[[item.label]]</paper-item>
          </template>
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      blocks: {
        type: Array,
        value: [{
          block: "H1",
          label: "H1"
        }, {
          block: "H2",
          label: "H2"
        }, {
          block: "H3",
          label: "H3"
        }, {
          block: "H4",
          label: "H4"
        }, {
          block: "H5",
          label: "H5"
        }, {
          block: "H6",
          label: "H6"
        }, {
          block: "P",
          label: "P"
        }]
      },
      selected: Object
    };
  }

  select(e) {
    this.editor.exec("formatBlock", e.target.textContent);
  }
}
window.customElements.define("boo-wysiwyg-e-title", BooWysiwygETitle);
