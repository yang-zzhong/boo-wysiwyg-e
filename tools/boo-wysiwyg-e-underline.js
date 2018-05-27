import '@polymer/polymer/polymer-element.js';
import {BooWysiwygEToggle} from '../boo-wysiwyg-e-toggle.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEUnderline extends BooWysiwygEToggle {
  constructor() {
    super();
    this.command = 'underline';
    this.label = '下划线';
    this.icon = 'bwe-toggle:underline';
  }
}
window.customElements.define("boo-wysiwyg-e-underline", BooWysiwygEUnderline);
