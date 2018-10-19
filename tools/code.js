import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Code extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="boo-wysiwyg:format-code"
        on-click="_code"></paper-icon-button>
    `;
  }

  command() {
    return 'formatBlock';
  }

  isFormat() {
    return false;
  }

  _code() {
    this.editarea.focus().exec('formatBlock', 'pre');
  }
}

window.customElements.define('boo-wysiwyg-code', Code);
