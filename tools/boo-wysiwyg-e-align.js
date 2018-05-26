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
        :host([disabled]) {
          color: grey;
        }
      </style>

      <array-selector 
        id="selector" 
        items=[[aligns]] 
        selected={{selected}}></array-selector>

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
          icon: "boo-wysiwyg-e:format-align-left",
          label: "左对齐"
        }, {
          command: "justifyCenter",
          icon: "boo-wysiwyg-e:format-align-center",
          label: "居中对齐"
        }, {
          command: "justifyRight",
          icon: "boo-wysiwyg-e:format-align-right",
          label: "右对齐"
        }, {
          command: "justifyFull",
          icon: "boo-wysiwyg-e:format-align-justify",
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
