import {BooWysiwygeTool} from './tool.js';
import {html, css} from 'lit-element';
import {sharedStyles} from './shared-styles.js';
import './icons.js';

export class BooWysiwygeToggleTool extends BooWysiwygeTool {

  static get styles() {
    const style = css`
      :host([active]) .icon-btn {
        background-color: #e0e0e0;
        fill: blue;
        color: blue;
      }
    `;
    return [sharedStyles, style];
  }

  static get properties() {
    return {
      active: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`
      <div class="icon-btn" title="${this.title()}" @click=${this.toggle}>
        ${this.icon()}
        <paper-ripple></paper-ripple>
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
