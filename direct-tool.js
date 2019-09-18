import {BooWysiwygeTool} from './tool';
import {html} from 'lit-element';
import '@material/mwc-icon-button';
import {sharedStyles} from './shared-styles';

export class BooWysiwygeDirectTool extends BooWysiwygeTool {

  static get styles() {
    return sharedStyles;
  }

  render() {
    if (this.iconName) {
      return html`<mwc-icon-button icon=${this.iconName()} @click=${this._exec}></mwc-icon-button>`;
    }
    return html`
      <mwc-icon-button title="${this.title()}" @click=${this.toggle}>
        ${this.icon()}
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
