import '@polymer/polymer/polymer-element.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/neon-animation/animations/hero-animation.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import 'code-sample/code-sample.js';
import {BooWindow} from 'boo-window/boo-window.js';

class BooWysiwygECode extends BooWysiwygETool {
  static get template() {
    return html`
      <style>
        app-toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-end;
          box-sizing: border-box;
        }
        boo-window {
          --boo-window-container: {
            box-shadow: 0px 0px 10px rgba(0, 0, 0, .4);
          }
        }
        paper-dropdown-menu {
          width: 150px;
        }
        [slot=content] {
          background-color: var(--boo-wysiwyg-e-code-bg-color);
          color: var(--boo-wysiwyg-e-code-fg-color);
          padding: 10px;
        }
        [slot=move-trigger] {
          background-color: var(--boo-wysiwyg-e-code-bg-color);
          color: var(--boo-wysiwyg-e-code-fg-color);
        }
        paper-listbox {
          background-color: var(--boo-wysiwyg-e-code-bg-color);
          color: var(--boo-wysiwyg-e-code-fg-color);
        }
        paper-dropdown-menu,
        paper-textarea {
          --paper-input-container-input: {
            color: var(--boo-wysiwyg-e-code-fg-color);
          }
          --paper-input-container-label: {
            color: var(--boo-wysiwyg-e-code-fg-color);
          }
          --paper-input-container-label-focus: {
            color: var(--boo-wysiwyg-e-code-fg-color);
          }
        }
        .oper {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
        .inputWrapper {
          overflow-x: hidden;
          overflow-y: auto;
          box-sizing: border-box;
          max-height: calc(100vh - 160px);
        }

        paper-textarea {
          height: 100%;
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-code">
        <svg><defs>
          <g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-icon-button 
        id="button"
        title="插入代码" 
        icon="bwe-code:code" 
        on-click="_open"></paper-icon-button>

      <boo-window
        id="win"
        opened="{{opened}}"
        pos-policy="center"
        width="600">

        <app-toolbar id="header" slot="move-trigger">
          <span>插入代码</span>
          <paper-dropdown-menu value="{{theme}}" label="选择主题">
            <paper-listbox slot="dropdown-content">
              <template id="themes" is="dom-repeat" items="[[themes]]">
                <paper-item>[[item]]</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>
        </app-toolbar>
        
        <div slot="content">

          <div id="content" class="inputWrapper">
            <paper-textarea 
              value="{{_code}}"
              label="输入代码..." 
              on-keydown="_keyBind"
              on-input="_reheight" rows="10"></paper-textarea>
          </div>
          <div id="operate" class="oper">
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
        observer: '_openedChanged',
        notify: true
      },
      themes: {
        type: Array,
        value: [
          "one-dark", "atom-one-light", "default", "github", "kustom-dark", "kustom-light",
          "solarized-dark", "solarized-light"
        ]
      },
      theme: {
        type: String,
        value: "one-dark",
      },
      _code: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor.codeTheme = this.themes[0];
    this.sharedElements = {
      code: this.$.button,
    };
    this.$.win.sharedElements = {
      code: this.$.win.shadowRoot.querySelector('.wrapper'),
    };
    this._animation();
  }

  code() {
    if (this.codeId) {
      let node = this.editor.$.editor.querySelector("#" + this.codeId);
      node.innerHTML = '<template>'+this._code+'</template>';
      node.notifyContentChanged();
      this._code = "";
      this.opened = false;
      return;
    }
    let id = 'a' + this.editor.id();
    this.editor.exec("inserthtml", '<br/>' +
        '<code-sample id="' + id + '" theme-name=\"'+this.theme+'\">' +
          '<template>'+this._code+'</template>'+
        '</code-sample>' +
      '<br/> <br/>');

    let node = this.editor.$.editor.querySelector("#" + id);
    this.editor.attachMenu(node, this.getMenu(node));

    this._code = "";
    this.opened = false;
  }

  getMenu(node) {
    let con = document.createElement('div');
    con.setAttribute('data-for', node.getAttribute('id'));
    con.classList.add('tool-menu');
    let edit = document.createElement('span');
    edit.classList.add('tool-item');
    edit.innerHTML = '编辑';
    edit.addEventListener('click', () => {
      this.codeId = node.getAttribute('id');
      this._code = node.code();
      this.opened = true;
    });
    let del = document.createElement('span');
    del.innerHTML = '删除';
    del.addEventListener('click', () => {
      node.parentNode.removeChild(node);
      con.parentNode.removeChild(con);
    });
    del.classList.add('tool-item');
    con.appendChild(edit);
    con.appendChild(del);

    return con;
  }

  resetLayout() {
    let hr = this.$.header.getBoundingClientRect();
    let wr = this.$.win.getBoundingClientRect();
    let or = {height: 0};
    if (this.$.operate) {
      or = this.$.operate.getBoundingClientRect();
    }
    let wh = wr.height;
    if (!this.$.win.smallScreen) {
      wh = Math.min(BooWindow.screenHeight - 40, wh);
      this.$.win.height = wh;
    }
    let height = (wh - hr.height - or.height + 20);
    this.$.content.style.height = height + 'px';
    this.$.win.update();
  }

  _openedChanged(opened) {
    if (opened && this.$.win.smallScreen) {
      this.resetLayout();
    }
  }

  _keyBind(e) {
    switch (e.key) {
      case "Tab":
        document.execCommand("inserttext", false,  "\t");
        e.preventDefault();
        break;
    }
  }

  _selectTheme(e) {
    this.theme = this.$.themes.itemForElement(e.target);
  }

  _open() {
    this.codeId = null;
    this.opened = true;
  }

  _close() {
    this.codeId = null;
    this.opened = false;
  }

  _reheight() {
    this.$.win.height = this.$.win.computeHeight();
    this.$.win.update();
  }

  _animation() {
   this.$.win.animationConfig = {
      entry: [{
        name: "hero-animation",
        id: "code",
        fromPage: this,
        toPage: this.$.win,
      }],
      exit: [{
        name: "hero-animation",
        id: "code",
        fromPage: this.$.win,
        toPage: this,
      }]
    };
  }
}

window.customElements.define("boo-wysiwyg-e-code", BooWysiwygECode);
