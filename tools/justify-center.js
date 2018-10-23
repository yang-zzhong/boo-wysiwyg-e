import { ToggleTool } from '../toggle-tool.js';

class JustifyCenter extends ToggleTool {
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-align-center',
      },
      title: {
        type: String,
        value: '居中对齐'
      }
    };
  }
  command() {
    return 'justifyCenter';
  }
}

window.customElements.define('boo-wysiwyg-justify-center', JustifyCenter);
