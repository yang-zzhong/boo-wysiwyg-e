import {BooWysiwygETextColor} from './boo-wysiwyg-e-text-color.js';

class BooWysiwygEBackColor extends BooWysiwygETextColor {
  static get is() { return "boo-wysiwyg-e-back-color"; }
  static get properties() {
    return {
      title: {
        type: String,
        value: "背景颜色",
      },
      icon: {
        type: String,
        value: "bwe-color:format-color-fill"
      }
    };
  }

  select() {
    if (this.editor) {
      this.editor.exec("backcolor", this.value);
      this.$.dropdown.close();
    }
  }
}

window.customElements.define(BooWysiwygEBackColor.is, BooWysiwygEBackColor);
