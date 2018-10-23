import { ToggleTool } from '../toggle-tool.js';

class JustifyLeft extends ToggleTool {
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-align-left',
      },
      title: {
        type: String,
        value: '左对齐'
      }
    };
  }
  command() {
    return 'justifyLeft';
  }
}

window.customElements.define('boo-wysiwyg-justify-left', JustifyLeft);
