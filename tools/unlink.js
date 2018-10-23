import { DirectTool } from '../direct-tool.js';

class Unlink extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:unlink',
      },
      title: {
        type: String,
        value: '取消链接'
      }
    };
  }

  command() {
    return 'unlink';
  }
}

window.customElements.define('boo-wysiwyg-unlink', Unlink);
