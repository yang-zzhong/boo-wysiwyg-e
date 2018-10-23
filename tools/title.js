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

      <paper-menu-button 
        horizontal-align="[[horizontalAlign]]" 
        vertical-align="[[verticalAlign]]">

        <paper-icon-button 
          icon="boo-wysiwyg:text-format" 
          title="标题" 
          slot="dropdown-trigger"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template is="dom-repeat" items="[[blocks]]">
            <paper-item on-click="select">[[item]]</paper-item>
          </template>
        </paper-listbox>

      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      horizontalAlign: {
        type: String,
        reflectToAttribute: true
      },
      verticalAlign: {
        type: String,
        reflectToAttribute: true
      },
      blocks: {
        type: Array,
        value: ["h1","h2", "h3", "h4", "h5", "h6"]
      }
    };
  }

  command() {
    return 'formatBlock';
  }

  select(e) {
    this.editarea
      .focus()
      .selectCurrent()
      .exec("formatBlock", e.target.textContent.trim().toUpperCase());
  }
}

window.customElements.define("boo-wysiwyg-title", Title);
