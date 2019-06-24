
import { BooWysiwygeToggleTool } from '../toggle-tool.js';
import {formatListNumberedIcon, formatListBulletedIcon} from '../icons.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class OrderedList extends BooWysiwygeToggleTool {
  icon() { return formatListNumberedIcon; }
  title() { return '有序列表'; }
  command() { return 'insertOrderedList'; }
}

class UnorderedList extends BooWysiwygeToggleTool {
  icon() { return formatListBulletedIcon; }
  title() { return '无序列表'; }
  command() { return 'insertUnorderedList'; }
}

window.customElements.define('boo-wysiwyg-ordered-list', OrderedList);
window.customElements.define('boo-wysiwyg-unordered-list', UnorderedList);

class List extends LitElement {

  static get styles() {
    return containerStyles;
  }

  static get properties() {
    return {
      editarea: {type: String, reflect: true}
    };
  }

  render() {
    return html`
      <boo-wysiwyg-ordered-list editarea=${this.editarea}></boo-wysiwyg-ordered-list>
      <boo-wysiwyg-unordered-list editarea=${this.editarea}></boo-wysiwyg-unordered-list>
    `;
  }
}

window.customElements.define('boo-wysiwyg-list', List);