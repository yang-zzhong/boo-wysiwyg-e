import { DirectTool } from '../direct-tool.js';

class Undo extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:undo',
      },
      title: {
        type: String,
        value: '撤销'
      }
    };
  }

  command() {
    return 'undo';
  }
}

window.customElements.define('boo-wysiwyg-undo', Undo);
