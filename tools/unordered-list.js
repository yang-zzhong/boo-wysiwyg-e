import { ToggleTool } from '../toggle-tool.js';

class UnorderedList extends ToggleTool {

  static get properties() {
    return {
      icon: {
        type: String,
        value: 'boo-wysiwyg:format-list-bulleted',
      },
      title: {
        type: String,
        value: '无序列表'
      }
    };
  }

  command() {
    return 'insertUnorderedList';
  }
}

window.customElements.define('boo-wysiwyg-unordered-list', UnorderedList);
