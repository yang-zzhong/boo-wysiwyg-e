import { LitElement, html, css } from 'lit-element';
import './editarea.js';
import './tools/align.js';
import './tools/block.js';
import './tools/dent.js';
import './tools/list.js';
import './tools/other.js';
import './tools/text.js';

/**
 * `boo-wysiwyg-e`
 * 
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooWysiwygE extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      paper-tabs {
        position: sticky;
        top: 0px;
        z-index: 1;
        outline: none;
        background-color: white;
      }
      div {
        position: sticky;
        top: 0px;
        z-index: 1;
        background-color: white;
      }
      boo-wysiwyg-e-editarea {
        overflow: auto;
        padding: 10px;
      }
    `;
  };

  render () {
    return html`
      <div>
        <boo-wysiwyg-text editarea="editarea"></boo-wysiwyg-text>
        <boo-wysiwyg-remove-format editarea="editarea"></boo-wysiwyg-remove-format>
        <boo-wysiwyg-dent editarea="editarea"></boo-wysiwyg-dent>
        <boo-wysiwyg-align editarea="editarea"></boo-wysiwyg-align>
        <boo-wysiwyg-list editarea="editarea"></boo-wysiwyg-list>
        <boo-wysiwyg-block editarea="editarea"></boo-wysiwyg-block>

        <boo-wysiwyg-unlink editarea="editarea"></boo-wysiwyg-unlink>
        <boo-wysiwyg-superscript editarea="editarea"></boo-wysiwyg-superscript>
        <boo-wysiwyg-subscript editarea="editarea"></boo-wysiwyg-subscript>
        <boo-wysiwyg-undo editarea="editarea"></boo-wysiwyg-undo>
        <boo-wysiwyg-redo editarea="editarea"></boo-wysiwyg-redo>
      </div>
      <boo-wysiwyg-editarea name="editarea">
        <div contenteditable placeholder="请输入内容"></div>
      </boo-wysiwyg-editarea>
    `;
  }
}

window.customElements.define("boo-wysiwyg-e", BooWysiwygE);
