import {BlockTool} from '../block-tool.js';

class H2 extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:h2',
      },
      title: {
        type: String,
        value: 'h2'
      }
    };
  }

  block() {
    return 'h2';
  }
}

window.customElements.define('boo-wysiwyg-h2', H2);
