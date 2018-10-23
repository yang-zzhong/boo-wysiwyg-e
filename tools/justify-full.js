import { ToggleTool } from '../toggle-tool.js';

class JustifyFull extends ToggleTool {
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-align-justify',
      },
      title: {
        type: String,
        value: '两端对齐'
      }
    };
  }
  command() {
    return 'justifyFull';
  }
}

window.customElements.define('boo-wysiwyg-justify-full', JustifyFull);
