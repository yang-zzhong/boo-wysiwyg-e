import { BooWysiwygeToggleTool } from '../toggle-tool.js';
import {LitElement, html} from 'lit-element';
import {containerStyles} from '../shared-styles';

class AlignCenter extends BooWysiwygeToggleTool {
  iconName() { return 'format_align_center' }
  title() { return '居中对齐'; }
  command() { return 'justifyCenter'; }
}

class AlignLeft extends BooWysiwygeToggleTool {
  iconName() { return 'format_align_left' }
  title() { return '左对齐'; }
  command() { return 'justifyLeft'; }
}

class AlignRight extends BooWysiwygeToggleTool {
  iconName() { return 'format_align_right' }
  title() { return '右对齐'; }
  command() { return 'justifyRight'; }
}

class AlignFull extends BooWysiwygeToggleTool {
  iconName() { return 'format_align_justify' }
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
