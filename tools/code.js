import '@authentic/mwc-button';
import '@authentic/mwc-ripple';
import '@authentic/mwc-select';
import '@authentic/mwc-list';
import '@authentic/mwc-list/mwc-list-item';
import 'lit-monaco-element';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';
import {unlinkIcon, createIcon, formatCodeIcon} from '../icons';

class BooWysiwygeCode extends BooWysiwygeTool {

  static get properties() {
    return {
      langs: {type: Array}
    };
  }

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
      <div class="icon-btn" title="插入代码" @click=${this._openInput}>
        ${formatCodeIcon}
        <mwc-ripple></mwc-ripple>
      </div>
      <boo-dialog>
        <main wrapper>
        <mwc-select label="选择语言">
          <mwc-menu slot="menu">
            <mwc-list>
              ${this.langs.map(lang => html`<mwc-list-item @click=${() => this._insertBlock(lang)} value=${lang}>${lang}</mwc-list-item>`)}
            </mwc-list>
          </mwc-menu>
        </mwc-select>
      </boo-dialog>
    `;
  }

  constructor() {
    super();
    setTimeout(() => {
      this.area().menuNodes.push(this);
    }, 100);
    this.langs = [
      "javascript",
      "php",
      "html",
      "css"
    ];
  }

  is(node) {
    let idx = 0;
    let p = node;
    while(p && p != this.area().area()) {
      if (p.nodeType == 1 && p.tagName == 'LIT-MONACO-ELEMENT') {
        return {tool: this, prior: idx, node: p};
      }
      p = p.parentNode;
      idx++;
    }
    return false;
  }

  _insertBlock(lang) {
    let html = `<monaco-element language=${lang} autogrow max-height=300></monaco-element>`;
    this.area().focus();
    this.area().exec('insertHTML', html);
    this.shadowRoot.querySelector('boo-dialog').close();
  } 

  _openInput() {
    this.shadowRoot.querySelector('boo-dialog').open();
  }

  menuItems() {
    return [{
      title: "修改链接地址",
      icon: createIcon,
      click: function(node) {
        this.area().focus();
        this.area().selectNode(node);
        this.shadowRoot.querySelector('mwc-textfield').value = node.getAttribute('href');
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

  _cancel() {
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
    });
  }
}

customElements.define('boo-wysiwyg-code', BooWysiwygeCode);
