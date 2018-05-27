import '@polymer/polymer/polymer-element.js';
import {BooWysiwygEToggle} from '../boo-wysiwyg-e-toggle.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEBold extends BooWysiwygEToggle {
  constructor() {
    super();
    this.command = 'bold';
    this.label = '加粗';
    this.icon = 'bwe-toggle:bold';
  }
}
window.customElements.define("boo-wysiwyg-e-bold", BooWysiwygEBold);
