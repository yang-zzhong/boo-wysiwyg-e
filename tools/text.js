import { BooWysiwygeToggleTool } from '../toggle-tool';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class Bold extends BooWysiwygeToggleTool {
  iconName() { return 'format_bold' }
  title() { return '粗体'; }
  command() { return 'bold'; }
}

class Italic extends BooWysiwygeToggleTool {
  iconName() { return 'format_italic' }
  title() { return '斜体'; }
  command() { return 'italic'; }
}

class Underline extends BooWysiwygeToggleTool {
  iconName() { return 'format_underline' }
  title() { return '下划线'; }
  command() { return 'underline'; }
}

class Strike extends BooWysiwygeToggleTool {
  iconName() { return 'format_strikethrough' }
  title() { return '删除线'; }
  command() { return 'strikeThrough'; }
}

window.customElements.define('boo-wysiwyg-bold', Bold);
window.customElements.define('boo-wysiwyg-italic', Italic);
window.customElements.define('boo-wysiwyg-underline', Underline);
window.customElements.define('boo-wysiwyg-strike', Strike);

class Text extends LitElement {

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
      <boo-wysiwyg-bold editarea=${this.editarea}></boo-wysiwyg-bold>
      <boo-wysiwyg-italic editarea=${this.editarea}></boo-wysiwyg-italic>
      <boo-wysiwyg-underline editarea=${this.editarea}></boo-wysiwyg-underline>
      <boo-wysiwyg-strike editarea=${this.editarea}></boo-wysiwyg-strike>
    `;
  }
}

customElements.define('boo-wysiwyg-text', Text);