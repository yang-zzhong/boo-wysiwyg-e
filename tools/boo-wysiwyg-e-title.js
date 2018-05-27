import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygETitle extends BooWysiwygETool {
  static get template() {
    return html`
      <style>
        paper-item:hover {
          cursor: pointer;
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-title">
        <svg><defs>
          <g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-menu-button>

        <paper-icon-button 
          icon="bwe-title:text-format" 
          title="标题/段落" 
          slot="dropdown-trigger"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template is="dom-repeat" items=[[blocks]]>
            <paper-item on-click="select">
              [[item.label]]
            </paper-item>
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
