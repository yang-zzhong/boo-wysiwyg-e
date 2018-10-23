import {BlockTool} from '../block-tool.js';

class P extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:local-parking',
      },
      title: {
        type: String,
        value: '段落'
      }
    };
  }
  block() {
    return 'div';
  }
}

window.customElements.define('boo-wysiwyg-p', P);
