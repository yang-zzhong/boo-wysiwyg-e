import {Tool} from './tool.js';
import './icons.js';
import './tool-shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export class DirectTool extends Tool {
  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="[[icon]]"
        title="[[title]]"
        on-click="_exec"></paper-icon-button>
    `;
  }

  static get properties() {
    return {
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

  _exec() {
    if (typeof this.value == 'function') {
      return this.exec(this.command(), this.value());
    }

    return this.exec(this.command());
  }
}
