import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-ripple/paper-ripple.js';

export class BooWysiwygeTool extends LitElement {

  static get properties() {
    return {
      editarea: {type: String, reflect: true},
      area: {type: Object},
      disabled: { type: Boolean, reflect: true}
    };
  }

  constructor() {
    super();
    setTimeout(() => {
      if (typeof this.handleSelectionChanged == 'function') {
        this.area().addSelectionObserver(this);
      }
    }, 100);
  }

  area() {
    if(window.boo_wysiwyge_editarea) {
      return window.boo_wysiwyge_editarea[this.editarea];
    }
  }
}
