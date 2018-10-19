import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Tool extends PolymerElement {

  static get properties() {
    return {
      active: {
        type: Boolean,
        reflectToAttribute: true,
        computed: '_computeActive(value)'
      },
      value: {
        type: Boolean,
        notify: true,
      },
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
    if (this.isFormat()) {
      editarea.register(this.command(), this);
    }
  }

  _toggle() {
    if (this.disabled) {
      return;
    }
    this.editarea.focus().exec(this.command()).update();
  }

  isFormat() {
    return true;
  }

  _computeActive(value) {
    return value;
  }
}
