import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from './boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

export class BooWysiwygEToggle extends BooWysiwygETool {

  static get template() {
    return html`
      <style>
        [active] {
          --paper-icon-button: {
            background-color: #e0e0e0;
            border-radius: 50%;
          }
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-toggle">
        <svg><defs>
          <g id="underline"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></g>
          <g id="bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
          <g id="italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>
        </defs></svg>
      </iron-iconset-svg>
      <paper-icon-button 
        active={{active}}
        toggle
        title="{{label}}" 
        icon="{{icon}}" 
        on-click="_active"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        reflectAttribute: true
      },
      command: String,
      label: String,
      icon: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.addEventListener("selectionchange", this._onActive.bind(this));
  }

  _active() {
    this.editor.exec(this.command);
    this._onActive();
  }

  _onActive() {
    this.active = this.editor.commandState(this.command);
  }
}
