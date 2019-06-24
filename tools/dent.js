import { BooWysiwygeDirectTool } from '../direct-tool.js';
import {formatIndentIncreaseIcon, formatIndentDecreaseIcon} from '../icons.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class Indent extends BooWysiwygeDirectTool {
  icon() { return formatIndentIncreaseIcon; }
  title() { return '增加缩进' }
  command() { return 'indent' }
}

class Outdent extends BooWysiwygeDirectTool {
  icon() { return formatIndentDecreaseIcon; }
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