import {Tool} from './tool.js';
import '../icons.js';
import '../tool-shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export class ToggleTool extends Tool {
  static get template() {
    return html`
      <style include="tool-shared-styles">
        :host([active]) paper-icon-button[toggle] {
          --paper-icon-button: {
            background-color: #e0e0e0;
            color: blue;
            border-radius: 50%;
          }
        }
      </style>
      <paper-icon-button
        toggle
        icon="[[icon]]"
        title="[[title]]"
        on-click="toggle"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        reflectToAttribute: true
      },
      icon: {
        type: String,
        value: ""
      },
      title: {
        type: String,
        value: ""
      }
    };
  }

  toggle() {
    if (typeof this.command != 'function') {
      throw 'no command found';
    }
    this.editarea.focus().exec(this.command());
    if (typeof this.handleSelectionChanged == 'function') {
      this.handleSelectionChanged();
    }
  }
  handleSelectionChanged() {
    this.active = document.queryCommandState(this.command());
  }
}
