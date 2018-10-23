import { DirectTool } from '../direct-tool.js';

class Outdent extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-indent-decrease',
      },
      title: {
        type: String,
        value: '减少缩进'
      },
    };
  }

  command() {
    return 'outdent';
  }
}

window.customElements.define('boo-wysiwyg-outdent', Outdent);
