import '@material/mwc-ripple';
import { BooWysiwygeTool } from './tool';
import {html} from 'lit-element';
import {sharedStyles} from './shared-styles';

export class BooWysiwygeBlockTool extends BooWysiwygeTool {

  static get properties() {
    return {
      active: {type: Boolean, reflect: true}
    };
  }

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="icon-btn" title="${this.title()}" @click=${this.formatBlock}>
        ${this.icon()}
        <mwc-ripple></mwc-ripple>
      </div>
    `;
  }

  formatBlock() {
    this.area().focus();
    this.area().exec('formatBlock', this.block());
  }

  handleSelectionChanged() {
    let selected = this.area().selected();
    if (!selected || selected && !selected.startContainer) {
      return;
    }
    let node = selected.startContainer;
    while (node) {
      if (node.nodeType != 1) {
        node = node.parentNode;
        continue;
      }
      if (node.hasAttribute('contenteditable')) {
        this.active = false;
        return;
      }
      let tag = node.tagName;
      if (tag.toLowerCase() == this.block()) {
        this.active = true;
        return;
      }
      node = node.parentNode;
    }
  }
}
