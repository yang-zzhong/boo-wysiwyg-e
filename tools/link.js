import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';
import {unlinkIcon, createIcon, linkIcon} from '../icons';

class BooWysiwygeLink extends BooWysiwygeTool {
  static get styles() {
    const style = css`
        .r2l {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }   
    `;
    return [sharedStyles, dialogStyles, style];
  }

  render() {
    return html`
      <div class="icon-btn" title="链接" @click=${this._openInput}>
        ${linkIcon}
        <paper-ripple></paper-ripple>
      </div>
      <boo-dialog>
        <main wrapper>
          <paper-input label="输入链接地址" type=text></paper-input>
          <div class="r2l">
            <paper-button @click=${this._cancel}>取消</paper-button>
            <paper-button @click=${this._createLink}>确定</paper-button>
          </div>
        </main>
      </boo-dialog>
    `;
  }

  constructor() {
    super();
    this.addEventListener('keyup', e => {
      if (e.code == "Enter") {
        this._createLink();
      }
    });
    setTimeout(() => {
      this.area().menuNodes.push(this);
    }, 100);
  }

  is(node) {
    return node.tagName == "A";
  }

  menuItems() {
    return [{
      title: "修改链接地址",
      icon: createIcon,
      click: function(node) {
        this.area().focus();
        this.area().selectNode(node);
        this.shadowRoot.querySelector('paper-input').value = node.getAttribute('href');
        this._openInput();
        this.node = node;
      }.bind(this)
    }, {
      title: "取消链接",
      icon: unlinkIcon,
      click: function(node) {
        this.area().focus();
        this.area().selectNode(node);
        this.area().exec('unlink');
      }.bind(this)
    }];
  }

  _openInput() {
    this.node =  null;
    this.shadowRoot.querySelector('boo-dialog').open().then(() => {
      this.shadowRoot.querySelector('paper-input').focus();
    });
  }

  _createLink() {
    let link = this.shadowRoot.querySelector('paper-input').value.trim();
    if (this.node) {
      this.node.setAttribute('href', link);
    } else {
      this.area().focus();
      this.area().exec("createLink", link);
    }
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
      this.shadowRoot.querySelector('paper-input').value = "";
    });
  }

  _cancel() {
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
      this.shadowRoot.querySelector('paper-input').value = "";
    });
  }
}

customElements.define('boo-wysiwyg-link', BooWysiwygeLink);