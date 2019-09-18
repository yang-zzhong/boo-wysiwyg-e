import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';

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
      <mwc-icon-button icon="link" title="链接" @click=${this._openInput}></mwc-icon-button>
      <boo-dialog>
        <main wrapper>
          <h1>插入链接</h1>
          <mwc-textfield label="输入链接地址" type=text></mwc-textfield>
          <div class="r2l">
            <mwc-button @click=${this._cancel}>取消</mwc-button>
            <mwc-button @click=${this._createLink}>确定</mwc-button>
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
    let p = node;
    let idx = 0;
    while(p && p != this.area().area()) {
      if (p.nodeType == 1 && p.tagName == 'A') {
        return {tool: this, prior: idx, node: p}
      }
      p = p.parentNode;
      idx++;
    }
    return false;
  }

  menuItems() {
    return [{
      title: "修改链接地址",
      iconName: 'create',
      click: function(node) {
        this.area().focus();
        this.area().selectNode(node);
        this.shadowRoot.querySelector('mwc-textfield').value = node.getAttribute('href');
        this._openInput();
        this.node = node;
      }.bind(this)
    }, {
      title: "取消链接",
      iconName: 'link_off',
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
      this.shadowRoot.querySelector('mwc-textfield').focus();
    });
  }

  _createLink() {
    let link = this.shadowRoot.querySelector('mwc-textfield').value.trim();
    if (this.node) {
      this.node.setAttribute('href', link);
    } else {
      this.area().focus();
      this.area().exec("createLink", link);
    }
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
      this.shadowRoot.querySelector('mwc-textfield').value = "";
    });
  }

  _cancel() {
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
      this.shadowRoot.querySelector('mwc-textfield').value = "";
    });
  }
}

customElements.define('boo-wysiwyg-link', BooWysiwygeLink);
