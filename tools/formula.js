
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import katex from 'katex/dist/katex.mjs';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';
import {formulaIcon} from '../icons';

class BooWysiwygeFormula extends BooWysiwygeTool {
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
      <mwc-icon-button>${formulaIcon}</mwc-icon-button>
      <boo-dialog>
        <main wrapper>
          <h1>公式</h1>
          <mwc-textfield label="输入公式" type=text></mwc-textfield>
          <div class="r2l">
            <mwc-button @click=${this._cancel}>取消</mwc-button>
            <mwc-button @click=${this._createFormula}>确定</mwc-button>
          </div>
        </main>
      </boo-dialog>
    `;
  }

  constructor() {
    super();
    this.addEventListener('keyup', e => {
      if (e.code == "Enter") {
        this._createFormula();
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
      if (p.nodeType == 1 && p.classList.contains('formula')) {
        return {tool: this, prior: idx, node: p}
      }
      p = p.parentNode;
      idx++;
    }
    return false;
  }

  menuItems() {
    return [{
      title: "修改",
      iconName: 'create',
      click: function(node) {
        this.area().focus();
        this.area().selectNode(node);
        this.shadowRoot.querySelector('mwc-textfield').value = node.getAttribute('data-formula');
        this._openInput();
        this.node = node;
      }.bind(this)
    }];
  }

  _openInput() {
    this.node =  null;
    this.shadowRoot.querySelector('boo-dialog').open().then(() => {
      this.shadowRoot.querySelector('mwc-textfield').focus();
    });
  }

  _createFormula() {
    let formula = this.shadowRoot.querySelector('mwc-textfield').value.trim();
    if (this.node) {
      this.area().focus();
      this.area().selectNode(this.node);
      this.area().exec('delete');
    }
    var html = '<span class="formula" data-formula="' + formula + '">' + katex.renderToString(formula, {
        throwOnError: false,
        output: 'html'
    }) + '</span>';
    this.area().focus();
    this.area().exec('insertHTML', html);
    setTimeout(() => {
      this.shadowRoot.querySelector('boo-dialog').close().then(() => {
        this.shadowRoot.querySelector('mwc-textfield').value = "";
      });
    }, 10);
  }

  _cancel() {
    this.shadowRoot.querySelector('boo-dialog').close().then(() => {
      this.shadowRoot.querySelector('mwc-textfield').value = "";
    });
  }
}

customElements.define('boo-wysiwyg-formula', BooWysiwygeFormula);
