import {BooWysiwygeTool} from './tool.js';
import {html, css} from 'lit-element';
import {sharedStyles} from './shared-styles.js';

export class BooWysiwygeDirectTool extends BooWysiwygeTool {

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="icon-btn" title="${this.title()}" @click=${this._exec}>
        ${this.icon()}
        <paper-ripple></paper-ripple>
      </div>
    `;
  }

  _exec() {
    if (typeof this.value == 'function') {
      this.area().focus();
      this.exec(this.command(), this.value());
      return;
    }
    this.area().focus();
    this.area().exec(this.command());
  }
}
