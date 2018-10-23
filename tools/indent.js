import { DirectTool } from '../direct-tool.js';

class Indent extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-indent-increase',
      },
      title: {
        type: String,
        value: '增加缩进'
      },
    };
  }

  command() {
    return 'indent';
  }
}

window.customElements.define('boo-wysiwyg-indent', Indent);
