import { ToggleTool } from '../toggle-tool.js';

class OrderedList extends ToggleTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-list-numbered',
      },
      title: {
        type: String,
        value: '有序列表'
      }
    };
  }

  command() {
    return 'insertOrderedList';
  }
}

window.customElements.define('boo-wysiwyg-ordered-list', OrderedList);
