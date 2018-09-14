import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class BooWysiwygEBlock extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          position: relative;
        }
        .menu {
          position: absolute;
        }
      </style>
      <div>
        <slot name="content"></slot>
      </div>
      <div class="menu">
        <slot name="menu"></slot>
      </div>
    `;
  }
}

window.customElements.define('boo-wysiwyg-e-block', BooWysiwygEBlock);
