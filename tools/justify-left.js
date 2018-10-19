import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class JustifyLeft extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles"></style>
      <paper-icon-button
        disabled="[[disabled]]"
        icon="boo-wysiwyg:format-align-left"
        title="左对齐"
        on-click="_toggle"></paper-icon-button>
    `;
  }

  command() {
    return 'justifyLeft';
  }
}

window.customElements.define('boo-wysiwyg-justify-left', JustifyLeft);
