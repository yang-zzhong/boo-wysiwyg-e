import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Strike extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="boo-wysiwyg:format-strikethrough"
        on-click="_toggle"></paper-icon-button>
    `;
  }

  command() {
    return 'strikeThrough';
  }
}

window.customElements.define('boo-wysiwyg-strike', Strike);
