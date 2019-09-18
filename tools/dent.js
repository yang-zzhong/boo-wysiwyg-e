import { BooWysiwygeDirectTool } from '../direct-tool.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class Indent extends BooWysiwygeDirectTool {
  iconName() { return 'format_indent_increase' }
  title() { return '增加缩进' }
  command() { return 'indent' }
}

class Outdent extends BooWysiwygeDirectTool {
  iconName() { return 'format_indent_decrease' }
  title() { return '减少缩进' }
  command() { return 'outdent' }
}

window.customElements.define('boo-wysiwyg-indent', Indent);
window.customElements.define('boo-wysiwyg-outdent', Outdent);

class Dent extends LitElement {

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
      <boo-wysiwyg-indent editarea=${this.editarea}></boo-wysiwyg-indent>
      <boo-wysiwyg-outdent editarea=${this.editarea}></boo-wysiwyg-outdent>
    `;
  }
}

window.customElements.define('boo-wysiwyg-dent', Dent);