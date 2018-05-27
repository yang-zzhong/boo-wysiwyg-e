import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygELink extends BooWysiwygETool {

  static get template() {
    return html`
      <style>
        [slot=dropdown-content] {
          padding: 10px 20px;
        }
        paper-input {
          width: 250px;
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-link">
        <svg><defs>
          <g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-menu-button ignore-select>

        <paper-icon-button 
          icon="bwe-link:link" 
          title="链接" 
          slot="dropdown-trigger"></paper-icon-button>

        <div slot="dropdown-content">
          <paper-input value="{{href}}" label="输入链接"></paper-input>
          <paper-input value="{{name}}" label="输入名字"></paper-input>
          <paper-button on-click="_add">添加</paper-button>
        </div>
      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      href: String,
      name: String,
    };
  }

  _add() {
    console.log('_add');
  }
}
window.customElements.define("boo-wysiwyg-e-link", BooWysiwygELink);
