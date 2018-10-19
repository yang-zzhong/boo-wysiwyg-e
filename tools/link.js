import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import 'boo-window/boo-window.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/shadow.js';
import { Tool } from '../tool.js';
import '../icons.js';
import '../tool-shared-styles.js';

class Link extends Tool {

  static get template() {
    return html`
      <style include="tool-shared-styles">
        boo-window {
          --boo-window-container: {
            box-shadow: 2px 2px 20px rgba(0, 0, 0, .4);
            border-radius: 3px;
          }
          --boo-window-shadow: {
            opacity: .4;
            background-color: black;
          }
        }
        .close {
          background-color: inherit;
          color: black;
        }
        #input {
          width: 100%;
        }
        [slot=content] {
          @apply --layout-horizontal;
          @apply --layout-center;
          background-color: white;
          padding: 10px;
        }
      </style>

      <iron-a11y-keys 
        keys="enter"
        on-keys-pressed="_submit"></iron-a11y-keys>

      <paper-icon-button
        icon="boo-wysiwyg:link"
        on-click="_open"></paper-icon-button>

      <boo-window 
        opened="{{opened}}"
        no-resize
        no-small-screen
        width="370px" pos-policy="center" id="win">
        
        <div slot="content">
          <paper-input 
            placeholder="请输入链接" 
            no-label-float 
            id="input" value="{{value}}"></paper-input>

          <paper-button on-click="_insertLink">保存</paper-button>
          <paper-icon-button 
            class="close" 
            on-click="_close"
            icon="boo-wysiwyg:close"></paper-icon-button>
        </div>

      </boo-window>
    `;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        observer: '_openedChanged'
      },
      value: String,
    };
  }

  conncectedCallback() {
    super.connectedCallback();
  }

  command() {
    return 'createLink';
  }

  isFormat() {
    return false;
  }

  _open() {
    this.opened = true;
  }

  _submit(e) {
    this._insertLink();
    e.preventDefault();
  }

  _close() {
    this.opened = false;
  }

  _insertLink() {
    setTimeout(() => {
      this.editarea
        .focus()
        .select(this.editorSelected)
        .exec(this.command(), this.value);
      this.opened = false;
    }, 10);
  }

  _openedChanged(opened) {
    if (opened) {
      setTimeout(() => {
        this.editorSelected = this.editarea.selected();
        this.$.input.focus();
      }, 350);
    }
  }
}

window.customElements.define('boo-wysiwyg-link', Link);
