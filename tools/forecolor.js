import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Forecolor extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-swatch-picker 
        icon="boo-wysiwyg:format-color-text" 
        color="{{value}}"></paper-swatch-picker>
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
        observer: '_valueChanged'
      },
    };
  }

  isForamt() {
    return false;
  }

  command() {
    return 'forecolor';
  }

  _valueChanged(color) {
    this.editarea.focus().exec(this.command(), color).update();
  }
}

window.customElements.define('boo-wysiwyg-forecolor', Forecolor);
