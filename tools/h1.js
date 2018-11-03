import {BlockTool} from '../block-tool.js';

class H1 extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:h1',
      },
      title: {
        type: String,
        value: 'h1'
      }
    };
  }

  block() {
    return 'h1';
  }
}

window.customElements.define('boo-wysiwyg-h1', H1);
