import {BlockTool} from '../block-tool.js';

class H4 extends BlockTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:h4',
      },
      title: {
        type: String,
        value: 'h4'
      }
    };
  }

  block() {
    return 'h4';
  }
}

window.customElements.define('boo-wysiwyg-h4', H4);
