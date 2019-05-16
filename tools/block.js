import { BooWysiwygeBlockTool } from '../block-tool.js';
import {h1Icon, h2Icon, h3Icon, h4Icon, pIcon, formatCodeIcon} from '../icons.js';
import {LitElement, html} from 'lit-element';

class Code extends BooWysiwygeBlockTool {
  icon() { return formatCodeIcon; }
  title() { return '代码块'; }
  block() { return 'pre'; }
}

class H1 extends BooWysiwygeBlockTool {
  icon() { return h1Icon; }
  title() { return 'h1'; }
  block() { return 'h1'; }
}

class H2 extends BooWysiwygeBlockTool {
  icon() { return h2Icon; }
  title() { return 'h2'; }
  block() { return 'h2'; }
}

class H3 extends BooWysiwygeBlockTool {
  icon() { return h3Icon; }
  title() { return 'h3'; }
  block() { return 'h3'; }
}

class H4 extends BooWysiwygeBlockTool {
  icon() { return h4Icon; }
  title() { return 'h4'; }
  block() { return 'h4'; }
}

class P extends BooWysiwygeBlockTool {
  icon() { return pIcon; }
  title() { return '段落'; }
  block() { return 'div'; }
}

window.customElements.define('boo-wysiwyg-h1', H1);
window.customElements.define('boo-wysiwyg-h2', H2);
window.customElements.define('boo-wysiwyg-h3', H3);
window.customElements.define('boo-wysiwyg-h4', H4);
window.customElements.define('boo-wysiwyg-p', P);
window.customElements.define('boo-wysiwyg-code', Code);

class Block extends LitElement {
  static get properties() {
    return {
      editarea: {type: String, reflect: true}
    };
  }

  render () {
    return html`
      <boo-wysiwyg-h1 editarea=${this.editarea}></boo-wysiwyg-h1>
      <boo-wysiwyg-h2 editarea=${this.editarea}></boo-wysiwyg-h2>
      <boo-wysiwyg-h3 editarea=${this.editarea}></boo-wysiwyg-h3>
      <boo-wysiwyg-h4 editarea=${this.editarea}></boo-wysiwyg-h4>
      <boo-wysiwyg-p editarea=${this.editarea}></boo-wysiwyg-p>
      <boo-wysiwyg-code editarea=${this.editarea}></boo-wysiwyg-code>
    `;
  }
}

window.customElements.define('boo-wysiwyg-block', Block);