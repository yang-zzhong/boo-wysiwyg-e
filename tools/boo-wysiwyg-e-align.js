import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class BooWysiwygEAlign extends BooWysiwygETool {
  static get template() {
    return html`
    <style>
      paper-item:hover {
        cursor: pointer;
      }
    </style>
    <paper-menu-button>

      <paper-icon-button title="对齐方式" 
        icon="boo-wysiwyg-e:format-align-center" 
        slot="dropdown-trigger"></paper-icon-button>

      <paper-listbox slot="dropdown-content">
        <paper-item data-id="justifyCenter" on-click="select">
          <iron-icon icon="boo-wysiwyg-e:format-align-center"></iron-icon>
          <span>居中对齐</span>
        </paper-item>
        <paper-item data-id="justifyFull" on-click="select">
          <iron-icon icon="boo-wysiwyg-e:format-align-justify"></iron-icon>
          <span>两端对齐</span>
        </paper-item>
        <paper-item data-id="justifyLeft" on-click="select">
          <iron-icon icon="boo-wysiwyg-e:format-align-left"></iron-icon>
          <span>左对齐</span>
        </paper-item>
        <paper-item data-id="justifyRight" on-click="select">
          <iron-icon icon="boo-wysiwyg-e:format-align-right"></iron-icon>
          <span>右对齐</span>
        </paper-item>
      </paper-listbox>

    </paper-menu-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-align"; }

  select(e) {
    let node = e.target;
    let value = '';
    do {
      if (node.tagName == 'PAPER-ITEM') {
        value = node.getAttribute("data-id");
        break;
      }
    } while(node = node.parentNode);
    this.editor.exec(value, false);
  }
}
window.customElements.define(BooWysiwygEAlign.is, BooWysiwygEAlign);
