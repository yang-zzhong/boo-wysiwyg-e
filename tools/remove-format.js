import { DirectTool } from '../direct-tool.js';

class RemoveFormat extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:clear',
      },
      title: {
        type: String,
        value: '清除格式'
      }
    };
  }

  command() {
    return 'removeFormat';
  }
}

window.customElements.define('boo-wysiwyg-remove-format', RemoveFormat);
