import { ToggleTool } from '../toggle-tool.js';

class JustifyRight extends ToggleTool {
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-align-right',
      },
      title: {
        type: String,
        value: '右对齐'
      }
    };
  }
  command() {
    return 'justifyRight';
  }
}

window.customElements.define('boo-wysiwyg-justify-right', JustifyRight);
