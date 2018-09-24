import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../boo-wysiwyg-e.js'
import '../tools/boo-wysiwyg-e-bold.js';
import '../tools/boo-wysiwyg-e-clear.js';
import '../tools/boo-wysiwyg-e-title.js';
import '../tools/boo-wysiwyg-e-align.js';
import '../tools/boo-wysiwyg-e-text-color.js';
import '../tools/boo-wysiwyg-e-back-color.js';
import '../tools/boo-wysiwyg-e-undo.js';
import '../tools/boo-wysiwyg-e-redo.js';
import '../tools/boo-wysiwyg-e-code.js';
import '../tools/boo-wysiwyg-e-italic.js';
import '../tools/boo-wysiwyg-e-ordered-list.js';
import '../tools/boo-wysiwyg-e-unordered-list.js';
import '../tools/boo-wysiwyg-e-link.js';

class TestEditor extends PolymerElement {
  static get template() {
    return html`
      <style>
        boo-wysiwyg-e {
          --boo-land-row-back-color: black;
          background-color: black;
          color: white;
        }
        boo-wysiwyg-e-text-color {
          --boo-color-fg-color: white;
          --boo-color-bg-color: black;
        }
        boo-wysiwyg-e-back-color {
          --boo-color-fg-color: white;
          --boo-color-bg-color: black;
        }
        boo-wysiwyg-e-title {
          --boo-wysiwyg-e-title-list: {
            background-color: black;
            color: white;
          }
        }
        boo-wysiwyg-e-align {
          --boo-wysiwyg-e-align-list: {
            background-color: black;
            color: white;
          }
        }
        boo-wysiwyg-e-code {
          --boo-wysiwyg-e-code-bg-color: black;
          --boo-wysiwyg-e-code-fg-color: white;
        }
        boo-wysiwyg-e-link {
          --boo-wysiwyg-e-link-bg-color: black;
          --boo-wysiwyg-e-link-fg-color: white;
        }
      </style>
      <boo-wysiwyg-e id="editor" value="{{value}}">
        <app-toolbar>
          <boo-wysiwyg-e-bold></boo-wysiwyg-e-bold>
          <boo-wysiwyg-e-italic></boo-wysiwyg-e-italic>
          <boo-wysiwyg-e-title></boo-wysiwyg-e-title>
          <boo-wysiwyg-e-align></boo-wysiwyg-e-align>
          <boo-wysiwyg-e-text-color></boo-wysiwyg-e-text-color>
          <boo-wysiwyg-e-back-color></boo-wysiwyg-e-back-color>
          <boo-wysiwyg-e-code></boo-wysiwyg-e-code>
          <boo-wysiwyg-e-link></boo-wysiwyg-e-link>
          <boo-wysiwyg-e-clear></boo-wysiwyg-e-clear>
          <boo-wysiwyg-e-ordered-list></boo-wysiwyg-e-ordered-list>
          <boo-wysiwyg-e-unordered-list></boo-wysiwyg-e-unordered-list>
          <boo-wysiwyg-e-undo></boo-wysiwyg-e-undo>
          <boo-wysiwyg-e-redo></boo-wysiwyg-e-redo>
        </app-toolbar>
      </boo-wysiwyg-e>

      <button on-click="_setContent">设置内容</button>
      <button on-click="_getContent">获取内容</button>

      <pre><code id="pre"></code></pre>
    `;
  }

  _setContent() {
    this.$.editor.setContent("hello world");
  }

  _getContent() {
    this.$.pre.innerHTML = this.$.editor.content();
  }
}

window.customElements.define('test-editor', TestEditor);
