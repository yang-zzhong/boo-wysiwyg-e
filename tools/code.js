import {BlockTool} from '../block-tool.js';

class Code extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-code',
      },
      title: {
        type: String,
        value: '代码块'
      }
    };
  }

  block() {
    return 'pre';
  }
}

window.customElements.define('boo-wysiwyg-code', Code);
