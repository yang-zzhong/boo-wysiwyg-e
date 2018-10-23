import { ToggleTool } from '../toggle-tool.js';

class Bold extends ToggleTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-bold',
      },
      title: {
        type: String,
        value: '粗体'
      }
    };
  }

  command() {
    return 'bold';
  }
}

window.customElements.define('boo-wysiwyg-bold', Bold);
