import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { ToggleTool } from '../toggle-tool.js';
import '@polymer/paper-swatch-picker/paper-swatch-picker.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Backcolor extends ToggleTool {

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
    return 'backColor';
  }

  _valueChanged(color) {
    this.editarea.focus().selectCurrent().exec(this.command(), color);
  }
}

window.customElements.define('boo-wysiwyg-backcolor', Backcolor);
