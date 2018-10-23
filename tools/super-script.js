import { DirectTool } from '../direct-tool.js';

class Superscript extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-superscript',
      },
      title: {
        type: String,
        value: '上标'
      }
    };
  }

  command() {
    return 'superscript';
  }
}

window.customElements.define('boo-wysiwyg-superscript', Superscript);
