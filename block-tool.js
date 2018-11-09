import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from './tool.js';
import './icons.js';
import './tool-shared-styles.js';

export class BlockTool extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="[[icon]]"
        title="title"
        on-click="formatBlock"></paper-icon-button>
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

  formatBlock() {
    this.editarea.focus();
    setTimeout(()=> {
      this.editarea.exec('formatBlock', this.block());
    }, 100);
  }
}
