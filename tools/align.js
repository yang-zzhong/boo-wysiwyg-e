import { BooWysiwygeToggleTool } from '../toggle-tool.js';
import {formatAlignCenterIcon, formatAlignJustifyIcon, formatAlignLeftIcon, formatAlignRightIcon} from '../icons.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class AlignCenter extends BooWysiwygeToggleTool {
  icon() { return formatAlignCenterIcon; }
  title() { return '居中对齐'; }
  command() { return 'justifyCenter'; }
}

class AlignLeft extends BooWysiwygeToggleTool {
  icon() { return formatAlignLeftIcon; }
  title() { return '左对齐'; }
  command() { return 'justifyLeft'; }
}

class AlignRight extends BooWysiwygeToggleTool {
  icon() { return formatAlignRightIcon; }
  title() { return '右对齐'; }
  command() { return 'justifyRight'; }
}

class AlignFull extends BooWysiwygeToggleTool {
  icon() { return formatAlignJustifyIcon; }
  title() { return '两端对齐'; }
  command() { return 'justifyFull'; }
}

class Align extends LitElement {

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
      <boo-wysiwyg-align-left editarea=${this.editarea}></boo-wysiwyg-align-left>
      <boo-wysiwyg-align-center editarea=${this.editarea}></boo-wysiwyg-align-center>
      <boo-wysiwyg-align-right editarea=${this.editarea}></boo-wysiwyg-align-right>
      <boo-wysiwyg-align-full editarea=${this.editarea}></boo-wysiwyg-align-full>
    `;
  }
}

window.customElements.define('boo-wysiwyg-align-center', AlignCenter);
window.customElements.define('boo-wysiwyg-align-left', AlignLeft);
window.customElements.define('boo-wysiwyg-align-right', AlignRight);
window.customElements.define('boo-wysiwyg-align-full', AlignFull);
window.customElements.define('boo-wysiwyg-align', Align);
