import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../boo-wysiwyg-e.js'

class TestEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
      </style>
      <boo-wysiwyg-e 
        placeholder="hello world"
        no-toolbar-scrollable
        hide-toolbar-scroll-buttons
        id="editor" value="{{value}}">
      </boo-wysiwyg-e>

      <button on-click="_setContent">设置内容</button>
      <button on-click="_getContent">获取内容</button>

      <pre id="pre"></pre>
    `;
  }

  _setContent() {
    this.$.editor.setContent('<h1>我是一个好孩子</h1><div>我是一个好孩子</div>');
  }

  _getContent() {
    this.$.pre.innerHTML = this.$.editor.content();
  }
}

window.customElements.define('test-editor', TestEditor);
