import { DirectTool } from '../direct-tool.js';

class Subscript extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-subscript',
      },
      title: {
        type: String,
        value: '下标'
      }
    };
  }

  command() {
    return 'subscript';
  }
}

window.customElements.define('boo-wysiwyg-subscript', Subscript);
