import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import 'boo-window/boo-window.js';
import '../highlight/highlight-import.js';

class BooWysiwygECode extends BooWysiwygETool {
  static get template() {
    return html`
      <style>
        app-toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-end;
        }
        boo-window {
          --boo-window-container: {
            box-shadow: 0px 0px 10px rgba(0, 0, 0, .4);
          }
        }
        [slot=content] {
          padding: 10px;
        }
        .oper {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
        
        .inputWrapper {
          max-height: calc(100vh - 150px);
          overflow-x: hidden;
          overflow-y: auto;
        }

      </style>
      <iron-iconset-svg size="24" name="bwe-code">
        <svg><defs>
          <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-icon-button 
        title="插入代码" 
        icon="bwe-code:code" 
        on-click="_open"></paper-icon-button>

      <boo-window
        id="win"
        opened="{{opened}}"
        pos-policy="center"
        width="600">

        <app-toolbar slot="move-trigger">
          <span>插入代码</span>
          <paper-dropdown-menu label="选择主题">
            <paper-listbox slot="dropdown-content" selected="{{_tidx}}">
              <template id="lang" is="dom-repeat" items="[[themes]]">
                <paper-item>[[item]]</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>
        </app-toolbar>
        
        <div slot="content">

          <div class="inputWrapper">
            <paper-textarea 
              value="{{_code}}"
              label="输入代码..." 
              on-keydown="_keyBind"
              on-input="_reheight" rows="10"></paper-textarea>
          </div>
          <div class="oper">
            <span></span>
            <span>
              <paper-button on-click="_close">取消</paper-button>
              <paper-button on-click="code">插入</paper-button>
            </span>
          </div>
        </div>

      </boo-window>
    `;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true
      },
      themes: {
        type: Array,
        value: [
          "default", "atom-one-light", "github", "kustom-dark", "kustom-light",
          "one-dark", "solarized-dark", "solarized-light"
        ]
      },
      _tidx: {
        type: Number,
        value: 0,
        observer: "_tidxChanged"
      },
      _code: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.codeTheme = this.themes[0];
  }

  code() {
    let code = this._highlight(this._code);
    this.editor.exec("inserthtml", "<pre><code>\n"+code+"\n</code></pre><br/>");
    this.opened = false;
  }

  _highlight(str) {
    let code = document.createElement('code');
    code.innerHTML = this._entitize(this._cleanIndentation(str));
    hljs.highlightBlock(code);

    return code.innerHTML;
  }

  _keyBind(e) {
    switch (e.key) {
      case "Tab":
        document.execCommand("inserttext", false,  "    ");
        e.preventDefault();
        break;
    }
  }

  _tidxChanged(idx) {
    if (this.editor) {
      this.editor.codeTheme = this.themes[idx];
    }
  }

  _cleanIndentation(str) {
    const pattern = str.match(/\s*\n[\t\s]*/);
    return str.replace(new RegExp(pattern, 'g'), '\n');
  }

  _entitize(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/=""/g, '')
      .replace(/=&gt;/g, '=>')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  _open() {
    this.opened = true;
  }

  _close() {
    this.opened = false;
  }

  _reheight() {
    this.$.win.height = this.$.win.computeHeight();
    this.$.win.update();
  }
}

window.customElements.define("boo-wysiwyg-e-code", BooWysiwygECode);
