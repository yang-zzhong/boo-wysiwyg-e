import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Paragraph extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="boo-wysiwyg:local-parking"
        on-click="_formatBlock"></paper-icon-button>
    `;
  }

  command() {
    return 'formatBlock';
  }

  isFormat() {
    return false;
  }

  _formatBlock() {
    this.editor.focus().exec('formatBlock', 'div');
  }
}

window.customElements.define('boo-wysiwyg-p', Paragraph);
