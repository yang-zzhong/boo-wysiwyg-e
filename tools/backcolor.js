import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Backcolor extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-swatch-picker 
        icon="boo-wysiwyg:format-color-fill" 
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

  command() {
    return 'backcolor';
  }

  isForamt() {
    return false;
  }

  _valueChanged(color) {
    this.editor.focus().exec(this.command(), color).update();
  }
}

window.customElements.define('boo-wysiwyg-backcolor', Backcolor);
