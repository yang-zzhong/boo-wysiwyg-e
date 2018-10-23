import { DirectTool } from '../direct-tool.js';

class Redo extends DirectTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:redo',
      },
      title: {
        type: String,
        value: '重做'
      }
    };
  }

  command() {
    return 'redo';
  }
}

window.customElements.define('boo-wysiwyg-redo', Redo);
