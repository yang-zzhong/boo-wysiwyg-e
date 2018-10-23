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
        horizontal-align="[[horizontalAlign]]"
        vertical-align="[[verticalAlign]]"
        icon="boo-wysiwyg:format-color-text" 
        color="{{value}}"></paper-swatch-picker>
    `;
  }

  static get properties() {
    return {
      horizontalAlign: {
        type: String,
        reflectToAttribute: true
      },
      verticalAlign: {
        type: String,
        reflectToAttribute: true
      },
      value: {
        type: String,
        observer: '_valueChanged'
      },
    };
  }

  command() {
    return 'foreColor';
  }

  _valueChanged(color) {
    this.editarea.focus().selectCurrent().exec(this.command(), color);
  }
}

window.customElements.define('boo-wysiwyg-forecolor', Forecolor);
