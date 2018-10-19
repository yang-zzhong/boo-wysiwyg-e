import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import { Tool } from '../tool.js';
import '../tool-shared-styles.js';

class Title extends Tool {
  static get template() {
    return html`
      <style include="tool-shared-styles">
        paper-item:hover {
          cursor: pointer;
        }
        paper-listbox {
          @apply --boo-wysiwyg-e-title-list;
        }
      </style>

      <paper-menu-button>

        <paper-icon-button 
          icon="boo-wysiwyg:text-format" 
          title="标题" 
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
        }]
      }
    };
  }

  command() {
    return 'formatBlock';
  }

  isFormat() {
    return false;
  }

  select(e) {
    this.editor.focus().exec("formatBlock", e.target.textContent.trim());
  }
}
window.customElements.define("boo-wysiwyg-title", Title);
