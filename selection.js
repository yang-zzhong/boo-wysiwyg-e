
import {getRange} from 'shadow-selection-polyfill';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export class Selection
{
  constructor(node, onchange) {
    this.node = node;
    let execOnChange = () => {
      let p = onchange();
      if (p) {
        return p;
      }
      return new Promise(r => r());
    }
    document.addEventListener('-shadow-selectionchange', () => {
      execOnChange().then(() => this.saveCurrentRange());
    });
  }

  saveCurrentRange() {
    let shadowRoot = this.nearShadowRoot();
    if (isSafari && shadowRoot) {
      let range = getRange(shadowRoot);
      if (range && this.isContainRange(range)) {
        this._currentRange = range;
      }
      return;
    }
    const selection = this.selection();
    if (selection.rangeCount < 1) {
      return;
    }
    const content = this.node;
    for (let i = 0; i < selection.rangeCount; i++) {
      let range = selection.getRangeAt(i);
      if (this.isContainRange(range)) {
        this._currentRange = range;
        break;
      }
    }
  }

  seek(offset, node) {
    this.onChildRange(offset, node, range => {
      this.select(range);
    });
  }

  select(range) {
    let sel = this.selection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  selection() {
    let node = this.nearShadowRoot();
    if (node && node.getSelection) {
      return node.getSelection();
    } else if (window.getSelection) {
      return window.getSelection();
    } else if (document.getSelection) {
      return document.getSelection();
    }
  }

  nearShadowRoot() {
    let node = this.node;
    for (; node; node = node.parentNode) {
      if (this.isShadowRoot(node)) {
        return node;
      }
    }
    return null;
  }

  isShadowRoot(node) {
    return node.toString() === "[object ShadowRoot]";
  }

  isContainRange(range) {
    if (this.shadowRootSelectionSupported()) {
      return this.node.contains(range.startContainer);
    }
    let contain;
    let area = this.node;
    this.onChildRange(range.startOffset, range.startContainer, range => {
      contain = area.contains(range.startContainer);
    });
    return contain;
  }

  onChildRange(offset, node, onRange) {
    let execOnRange = (node, offset) => {
      let range = new Range();
      range.setStart(node, offset);
      range.setEnd(node, offset);
      onRange(range);
    }
    node = node || this;
    this.onTextNode(node, tn => {
      if (offset <= tn.nodeValue.length) {
        execOnRange(tn, offset);
        return true;
      }
      offset -= tn.nodeValue.length;
      return false;
    });
  }

  onTextNode(e, on) {
    e = e || this.node;
    if (e.nodeType == 3) {
      return on(e);
    }
    if (e.nodeType != 1) {
      return false;
    }
    for(let i = 0; i < e.childNodes.length; ++i) {
      if (this.onTextNode(e.childNodes[i], on)) {
        return true;
      }
    }
    return false;
  }

  shadowRootSelectionSupported() {
    let node = this.nearShadowRoot();
    return node && node.getSelection;
  }

  selectNode(node) {
    let range = document.createRange();
    range.selectNode(node);
    this.select(range);
  }

  selectCurrent() {
    return this.select(this.selected());
  }

  selected() {
    return this._currentRange;
  }

  containNode(node) {
    while(node) {
      if (node == this.node) {
        return true;
      }
      if (isShadowRoot(node)) {
        node = node.host;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  restore(){
    if (this._currentRange) {
      const selection = this.selection();
      selection.removeAllRanges();
      selection.addRange(this._currentRange);
    }
  }

}
