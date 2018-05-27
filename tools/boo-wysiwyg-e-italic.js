import '@polymer/polymer/polymer-element.js';
import {BooWysiwygEToggle} from '../boo-wysiwyg-e-toggle.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

class BooWysiwygEItalic extends BooWysiwygEToggle {
  constructor() {
    super();
    this.command = 'italic';
    this.label = '斜体字';
    this.icon = 'bwe-toggle:italic';
  }
}

window.customElements.define("boo-wysiwyg-e-italic", BooWysiwygEItalic);
