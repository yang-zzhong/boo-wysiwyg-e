import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEAlign extends BooWysiwygETool {
  static get template() {
    return html`
      <style>
        paper-item:hover {
          cursor: pointer;
        }
        :host([disabled]) {
          color: grey;
        }
        paper-listbox {
          background-color: --boo-wysiwyg-e-bg-color;
          color: --boo-wysiwyg-e-fg-color;
          @apply --boo-wysiwyg-e-align-list;
        }
      </style>

      <array-selector 
        id="selector" 
        items=[[aligns]] 
        selected={{selected}}></array-selector>

      <iron-iconset-svg size="24" name="bwe-align">
        <svg><defs>
          <g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>
          <g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>
          <g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>
          <g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-menu-button>

        <paper-icon-button title="[[selected.label]]" 
          icon="[[selected.icon]]" 
          slot="dropdown-trigger"></paper-icon-button>

        <paper-listbox slot="dropdown-content">
          <template id="aligns" is="dom-repeat" items=[[aligns]]>
            <paper-item on-click="select">
              <iron-icon icon="[[item.icon]]"></iron-icon>
              <span>[[item.label]]</span>
            </paper-item>
          </template>
        </paper-listbox>

      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      aligns: {
        type: Array,
        value: [{
          command: "justifyLeft",
          icon: "bwe-align:format-align-left",
          label: "左对齐"
        }, {
          command: "justifyCenter",
          icon: "bwe-align:format-align-center",
          label: "居中对齐"
        }, {
          command: "justifyRight",
          icon: "bwe-align:format-align-right",
          label: "右对齐"
        }, {
          command: "justifyFull",
          icon: "bwe-align:format-align-justify",
          label: "两端对齐"
        }]
      },
      selected:  Object,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.selector.select(this.aligns[0]);
    this.editor.addEventListener("selectionchange", this._onFocus.bind(this));
  }

  select(e) {
    let node = e.target;
    let item = this.$.aligns.itemForElement(e.target)
    this.$.selector.select(item);
    this.editor.exec(this.selected.command, false);
  }

  _onFocus() {
    for(let i in this.aligns) {
      let state = this.editor.commandState(this.aligns[i].command);
      if (state) {
        this.$.selector.select(this.aligns[i]);
        break;
      }
    }
  }
}
window.customElements.define("boo-wysiwyg-e-align", BooWysiwygEAlign);
