import { PolymerElement } from '@polymer/polymer/polymer-element.js';

export class Keyboard extends PolymerElement {

  static get properties() {
    return {
      editarea: {
        type: Object,
        observer: '_editareaChanged'
      },
      bindKeys: {
        type: Object,
        value: {}
      }
    };
  }

  onKeyDown(key, callback) {
    this.bindKeys[key] = callback;
    return this;
  }

  _editareaChanged(editarea) {
    editarea.addEventListener('keydown', this._handle.bind(this));
  }

  _handle(e) {
    this.bindKeys.forEach((callback, key) => {
      if (this._match(key)) {
        callback.call(this.editarea, e);
      }
    });
  }
}
