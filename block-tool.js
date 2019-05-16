import { BooWysiwygeTool } from './tool.js';
import {html, css} from 'lit-element';
import {sharedStyles} from './shared-styles.js';

export class BooWysiwygeBlockTool extends BooWysiwygeTool {

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="icon-btn" title="${this.title()}" @click=${this.formatBlock}>
        ${this.icon()}
        <paper-ripple></paper-ripple>
      </div>
    `;
  }

  formatBlock() {
    this.area().focus();
    setTimeout(()=> {
      this.area().exec('formatBlock', this.block());
    }, 100);
  }
}
