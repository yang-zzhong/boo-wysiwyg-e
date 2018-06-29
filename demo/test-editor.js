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
    this.$.editor.setContent('<div id="___themeContent"><style>/*AtomOneLightbyDanielGamageOriginalOneLightSyntaxthemefromhttps://github.com/atom/one-light-syntaxbase:#fafafamono-1:#383a42mono-2:#686b77mono-3:#a0a1a7hue-1:#0184bbhue-2:#4078f2hue-3:#a626a4hue-4:#50a14fhue-5:#e45649hue-5-2:#c91243hue-6:#986801hue-6-2:#c18401*/.hljs{display:block;overflow-x:auto;color:var(--code-sample-color,#383a42);background:var(--code-sample-background,#fafafa);}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic;}.hljs-doctag,.hljs-keyword,.hljs-formula{color:#a626a4;}.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst{color:#e45649;}.hljs-literal{color:#0184bb;}.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta-string{color:#50a14f;}.hljs-built_in,.hljs-class.hljs-title{color:#c18401;}.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number{color:#986801;}.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title{color:#4078f2;}.hljs-emphasis{font-style:italic;}.hljs-strong{font-weight:bold;}.hljs-link{text-decoration:underline;}</style></div><pre><code>hello world</code></pre><br>');
  }

  _getContent() {
    this.$.pre.innerHTML = this.$.editor.content();
  }
}

window.customElements.define('test-editor', TestEditor);
