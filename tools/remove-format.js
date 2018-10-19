import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class RemoveFormat extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        toggle
        icon="boo-wysiwyg:clear"
        on-click="_toggle"></paper-icon-button>
    `;
  }

  command() {
    return 'removeFormat';
  }
}

window.customElements.define('boo-wysiwyg-remove-format', RemoveFormat);
