import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class BooCodeSample extends PolymerElement {
  static get template() {
    return html`
      <style>
        [slot=menu] {
          background-color: white;
          color: black;
          white-space: nowrap;
        }
      </style>

      <slot></slot>

      <div>
        <span>删除</span>
        <span>编辑</span>
      </div>
    `;
  }

  static get properties() {
    return {
      code: {
        type: String,
        reflectToAttribute: false,
      },
    };
  }
}

window.customElements.define('boo-code-sample', BooCodeSample);
