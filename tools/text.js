import { BooWysiwygeToggleTool } from '../toggle-tool.js';
import {formatBoldIcon, formatItalicIcon, formatUnderlinedIcon, formatStrikethroughIcon} from '../icons.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class Bold extends BooWysiwygeToggleTool {
  icon() { return formatBoldIcon; }
  title() { return '粗体'; }
  command() { return 'bold'; }
}

class Italic extends BooWysiwygeToggleTool {
  icon() { return formatItalicIcon; }
  title() { return '斜体'; }
  command() { return 'italic'; }
}

class Underline extends BooWysiwygeToggleTool {
  icon() { return formatUnderlinedIcon; }
  title() { return '下划线'; }
  command() { return 'underline'; }
}

class Strike extends BooWysiwygeToggleTool {
  icon() { return formatStrikethroughIcon; }
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