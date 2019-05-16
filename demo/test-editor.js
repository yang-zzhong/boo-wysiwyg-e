import { LitElement, html, css } from 'lit-element';
import '../boo-wysiwyg-e.js'

class TestEditor extends LitElement {
  render() {
    return html`
      <boo-wysiwyg-e></boo-wysiwyg-e>
    `;
  }
}

window.customElements.define('test-editor', TestEditor);
