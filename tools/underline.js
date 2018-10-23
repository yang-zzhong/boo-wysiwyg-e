import { ToggleTool } from '../toggle-tool.js';

class Underline extends ToggleTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-underlined',
      },
      title: {
        type: String,
        value: '下划线'
      }
    };
  }

  command() {
    return 'underline';
  }
}

window.customElements.define('boo-wysiwyg-underline', Underline);
