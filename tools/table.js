import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';
import {linkIcon} from '../icons';

export const tableStyles = css`
  .table {
    display: table;
    border-top: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    table-layout: fixed;
    width: 100%;
  }
  .table-row {
    display: table-row;
    box-sizing: border-box;
  }
  .table-cell {
    display: table-cell;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    width: 1;
  }
`;

class BooWysiwygeTable extends BooWysiwygeTool {
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
      <div class="icon-btn" title="插入表格" @click=${this._openInput}>
        ${linkIcon}
        <paper-ripple></paper-ripple>
      </div>
      <boo-dialog>
        <main wrapper>
          <paper-input label="行" name="row" type=number></paper-input>
          <paper-input label="列" name="col" type=number></paper-input>
          <div class="r2l">
            <paper-button @click=${this._cancel}>取消</paper-button>
            <paper-button @click=${this._createTable}>确定</paper-button>
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
  }

  _openInput() {
    this.shadowRoot.querySelector('boo-dialog').open().then(() => {
      this.shadowRoot.querySelector('paper-input').focus();
    });
  }

  _createTable() {
    let row = this.shadowRoot.querySelector('[name=row]').value.trim();
    let col = this.shadowRoot.querySelector('[name=col]').value.trim();
    let table = '<div class="table">';
    for (let i = 0; i < row; ++i) {
      table+= '<div class="table-row">';
      for(let j = 0; j < col; ++j) {
        table += '<div class="table-cell">&nbsp;</div>';
      }
      table += '</div>';
    }
    table += "</div>";
    this.area().focus();
    this.area().exec('insertHTML', table);
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

customElements.define('boo-wysiwyg-table', BooWysiwygeTable);