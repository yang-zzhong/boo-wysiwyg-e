import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import 'boo-window/boo-window.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class BooWysiwygELink extends BooWysiwygETool {

  static get template() {
    return html`
      <style>
        boo-window {
          --boo-window-container: {
            box-shadow: 0px 0px 10px rgba(0, 0, 0, .4);
            background-color: var(--boo-wysiwyg-e-link-bg-color);
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
        }
        [slot=content] {
          padding: 10px 20px;
        }
        paper-input {
          --paper-input-container-input: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
          --paper-input-container-label: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
          --paper-input-container-label-focus: {
            color: var(--boo-wysiwyg-e-link-fg-color);
          }
        }
        #oper {
          @apply --layout-horizontal-reverse;
        }
      </style>
      <iron-iconset-svg size="24" name="bwe-link">
        <svg><defs>
          <g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <paper-icon-button 
        id="button"
        icon="bwe-link:link" 
        title="链接" 
        on-click="_open"></paper-icon-button>

      <boo-window
        id="win"
        width="400px"
        opened="{{opened}}"
        pos-policy="center">

        <app-toolbar slot="move-trigger">
          <span>插入链接</span>
        </app-toolbar>

        <div slot="content">
          <paper-input value="{{href}}" label="输入链接"></paper-input>
          <paper-input value="{{name}}" label="输入名字"></paper-input>
          <div id="oper">
            <paper-button on-click="_add">添加</paper-button>
            <paper-button on-click="_close">取消</paper-button>
          </div>
        </div>
      </boo-window>
    `;
  }

  static get properties() {
    return {
      href: String,
      name: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.sharedElements = {
      code: this.$.button,
    };
    this.$.win.sharedElements = {
      code: this.$.win.shadowRoot.querySelector('.wrapper'),
    };
    this._animation();
  }

  _open() {
    this.opened = true;
  }

  _close() {
    this.opened = false;
  }

  _add() {
    this.editor.exec('inserthtml', '<a href="'+this.href+'">'+this.name+'</a>');
    this._close();
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
window.customElements.define("boo-wysiwyg-e-link", BooWysiwygELink);
