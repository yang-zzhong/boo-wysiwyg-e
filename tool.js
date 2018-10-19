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
      editor: {
        type: Object,
        observer: '_editorChanged'
      },
      disabled: {
        type: Boolean,
        reflectToAttribute: true
      }
    };
  }

  _editorChanged(editor) {
    if (this.isFormat()) {
      editor.register(this.command(), this);
    }
  }

  _toggle() {
    if (this.disabled) {
      return;
    }
    this.editor.focus().exec(this.command()).update();
  }

  isFormat() {
    return true;
  }

  _computeActive(value) {
    return value;
  }
}
