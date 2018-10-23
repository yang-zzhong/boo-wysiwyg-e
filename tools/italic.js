import { ToggleTool } from '../toggle-tool.js';

class Italic extends ToggleTool {
  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-italic',
      },
      title: {
        type: String,
        value: '斜体字'
      }
    };
  }

  command() {
    return 'italic';
  }
}

window.customElements.define('boo-wysiwyg-italic', Italic);
