import { ToggleTool } from '../toggle-tool.js';

class Strike extends ToggleTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-strikethrough',
      },
      title: {
        type: String,
        value: '删除线'
      }
    };
  }

  command() {
    return 'strikeThrough';
  }
}

window.customElements.define('boo-wysiwyg-strike', Strike);
