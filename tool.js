import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Tool extends PolymerElement {

  static get properties() {
    return {
      editarea: {
        type: Object,
        observer: '_editareaChanged'
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true
      }
    };
  }

  _editareaChanged(editarea) {
    if (typeof this.handleSelectionChanged == 'function') {
      editarea.addSelectionObserver(this);
    }
  }

  exec(command, params) {
    this.editarea.focus().exec(command, params);
  }
}
