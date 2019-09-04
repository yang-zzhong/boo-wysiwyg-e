import '@material/mwc-button';
import '@material/mwc-ripple';
import '@material/mwc-textfield';
import {BooWysiwygeTool} from '../tool';
import {dialogStyles} from 'boo-dialog';
import {html, css} from 'lit-element';
import {sharedStyles} from '../shared-styles';
import {
  deleteIcon, tableIcon, insertRowAfterIcon, delRowIcon, insertRowBeforeIcon,
  insertColAfterIcon, delColIcon, insertColBeforeIcon
} from '../icons';

export const tableStyles = css`
  .table {
    display: table;
    border-top: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    table-layout: fixed;
    box-sizing: border-box;
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
  .table-cell .table {
    height: 100%;
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
        ${tableIcon}
        <mwc-ripple></mwc-ripple>
      </div>
      <boo-dialog>
        <main wrapper>
          <h1>插入表格</h1>
          <mwc-textfield label="行" name="row" type=number></mwc-textfield>
          <mwc-textfield label="列" name="col" type=number></mwc-textfield>
          <div class="r2l">
            <mwc-button @click=${this._cancel}>取消</mwc-button>
            <mwc-button @click=${this._createTable}>确定</mwc-button>
          </div>
        </main>
      </boo-dialog>
    `;
  }

  constructor() {
    super();
    this.addEventListener('keyup', e => {
      if (e.code == "Enter") {
        this._createTable();
      }
    });
    setTimeout(() => {
      this.area().menuNodes.push(this);
    }, 100);
  }

  is(node) {
    let idx = 0;
    let p = node;
    while(p && p != this.area().area()) {
      if (p.nodeType == 1 && p.classList.contains('table-cell')) {
        return {tool: this, prior: idx, node: p};
      }
      p = p.parentNode;
      idx++;
    }
    return false;
  }

  menuItems() {
    return [{
      title: "删除表格",
      icon: deleteIcon,
      click: function(node) {
        this.area().focus();
        let n = node.parentNode.parentNode;
        n.parentNode.removeChild(n);
        this.area().maybeShowMenu();
      }.bind(this)
    }, {
      title: "行前插入",
      icon: insertRowBeforeIcon,
      click: this._insertRowBefore.bind(this),
    }, {
      title: "行后插入",
      icon: insertRowAfterIcon,
      click: this._insertRowAfter.bind(this),
    }, {
      title: "列前插入",
      icon: insertColBeforeIcon,
      click: this._insertColBefore.bind(this),
    }, {
      title: "列后插入",
      icon: insertColAfterIcon,
      click: this._insertColAfter.bind(this),
    }, {
      title: "删除列",
      icon: delColIcon,
      click: this._delCol.bind(this),
    }, {
      title: "删除行",
      icon: delRowIcon,
      click: this._delRow.bind(this),
    }]
  }

  _insertRowBefore(node) {
    let cur = node.parentNode;
    let row = this._newRow(node);
    cur.parentNode.insertBefore(row, cur);
  }

  _insertRowAfter(node) {
    let cur = node.parentNode;
    let row = this._newRow(node);
    if (cur.nextSibling) {
      cur.parentNode.insertBefore(row, cur.nextSibling);
    } else {
      cur.parentNode.appendChild(row);
    }
  }

  _insertColBefore(node) {
    this._insertCol(node, this._nodeCols(node) - 1);
  }

  _insertColAfter(node) {
    this._insertCol(node, this._nodeCols(node));
  }

  _insertCol(node, idx) {
    this._eachCol(node, (i, cell) => {
      if (i == idx + 1) {
        let col = document.createElement('div');
        col.classList.add('table-cell');
        cell.parentNode.insertBefore(col, cell);
        return true;
      }
      return false;
    });
  }

  _delCol(node) {
    let idx = this._nodeCols(node);
    this._eachCol(node, (i, cell) => {
      if (i == idx) {
        cell.parentNode.removeChild(cell);
        return true;
      }
      return false;
    });
  }

  _delRow(node) {
    let row = node.parentNode;
    row.parentNode.removeChild(row);
  }

  _nodeCols(node) {
    let i = 0;
    let cells = node.parentNode.querySelectorAll('.table-cell');
    for (let i = 0; i < cells.length; ++i) {
      if (cells[i] == node) {
        return i;
      }
    }
  }

  _eachCol(node, callback) {
    let table = node.parentNode.parentNode;
    let rows = table.querySelectorAll('.table-row');
    for(let i = 0; i < rows.length; ++i) {
      let row = rows[i];
      let cols = row.querySelectorAll('.table-cell');
      for (let j = 0; j < cols.length; ++j) {
        if (callback(j, cols[j])) {
          break;
        }
      }
    }
  }

  _newRow(node) {
    let cur = node.parentNode;
    let row = document.createElement('div');
    row.classList.add('table-row');
    let num = cur.querySelectorAll('.table-cell').length;
    for (let i = 0; i < num; ++i) {
      let col = document.createElement('div');
      col.classList.add('table-cell');
      row.appendChild(col);
    }
    return row;
  }

  _openInput() {
    this.shadowRoot.querySelector('boo-dialog').open().then(() => {
      this.shadowRoot.querySelector('mwc-textfield').focus();
    });
  }

  _createTable() {
    let row = this.shadowRoot.querySelector('[name=row]').value.trim();
    let col = this.shadowRoot.querySelector('[name=col]').value.trim();
    let table = '';
    if (!this.is(this.area().currentNode())) {
      table += '<br/>';
    }
    table += '<div class="table">';
    for (let i = 0; i < row; ++i) {
      table+= '<div class="table-row">';
      for(let j = 0; j < col; ++j) {
        table += '<div class="table-cell">&nbsp;</div>';
      }
      table += '</div>';
    }
    table += "</div>";
    if (!this.is(this.area().currentNode())) {
      table += '<br/>';
    }
    this.area().focus();
    this.area().exec('insertHTML', table);
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

customElements.define('boo-wysiwyg-table', BooWysiwygeTable);
