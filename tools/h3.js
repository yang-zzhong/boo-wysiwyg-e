import {BlockTool} from '../block-tool.js';

class H3 extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:h3',
      },
      title: {
        type: String,
        value: 'h3'
      }
    };
  }

  block() {
    return 'h3';
  }
}

window.customElements.define('boo-wysiwyg-h3', H3);
