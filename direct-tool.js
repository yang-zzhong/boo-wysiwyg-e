import {BooWysiwygeTool} from './tool';
import {html} from 'lit-element';
import '@material/mwc-ripple';
import {sharedStyles} from './shared-styles';

export class BooWysiwygeDirectTool extends BooWysiwygeTool {

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="icon-btn" title="${this.title()}" @click=${this._exec}>
        ${this.icon()}
        <mwc-ripple></mwc-ripple>
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
