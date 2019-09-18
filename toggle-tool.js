import {BooWysiwygeTool} from './tool';
import '@material/mwc-icon-button';
import {html} from 'lit-element';
import {sharedStyles} from './shared-styles';
import './icons';

export class BooWysiwygeToggleTool extends BooWysiwygeTool {

  static get styles() {
    return [sharedStyles];
  }

  static get properties() {
    return {
      active: { type: Boolean, reflect: true },
    };
  }

  render() {
    if (this.iconName) {
      return html`<mwc-icon-button icon=${this.iconName()} @click=${this.toggle}></mwc-icon-button>`;
    }
    return html`
      <mwc-icon-button title="${this.title()}" @click=${this.toggle}>
        ${this.icon()}
      </div>
    `;
  }

  toggle() {
    if (typeof this.command != 'function') {
      throw 'no command found';
    }
    this.area().focus();
    this.area().exec(this.command());
  }

  handleSelectionChanged() {
    this.active = document.queryCommandState(this.command());
  }
}
