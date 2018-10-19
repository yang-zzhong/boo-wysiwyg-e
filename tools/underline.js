import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Underline extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="boo-wysiwyg:format-underlined"
        on-click="_toggle"></paper-icon-button>
    `;
  }

  command() {
    return 'underline';
  }
}

window.customElements.define('boo-wysiwyg-underline', Underline);
