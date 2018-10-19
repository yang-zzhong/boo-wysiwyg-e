import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-tabs/paper-tabs.js';
import './editor.js';
import './tools/bold.js';
import './tools/justify-left.js';
import './tools/justify-right.js';
import './tools/justify-center.js';
import './tools/justify-full.js';
import './tools/remove-format.js';
import './tools/underline.js';
import './tools/strike.js';
import './tools/italic.js';
import './tools/redo.js';
import './tools/undo.js';
import './tools/unordered-list.js';
import './tools/ordered-list.js';
import './tools/backcolor.js';
import './tools/forecolor.js';
import './tools/code.js';
import './tools/p.js';
import './tools/link.js';
import './tools/unlink.js';
import './tools/indent.js';
import './tools/outdent.js';
import './tools/super-script.js';
import './tools/sub-script.js';
import './tools/title.js';

/**
 * `boo-wysiwyg-e`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooWysiwygE extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-tabs {
          position: sticky;
          top: 0px;
          z-index: 1;
          outline: none;
          background-color: white;
          @apply --boo-wysiwyge-e-toolbar;
          @apply --layout-horizontal;
          @apply --layout-center;
        }
        div {
          position: sticky;
          top: 0px;
          z-index: 1;
          background-color: white;
        }
        boo-wysiwyg-e-editor {
          overflow: auto;
          padding: 10px;
        }
      </style>
      <template is="dom-if" if="[[!noToolbarScrollable]]">
        <paper-tabs scrollable hide-scroll-buttons="[[hideToolbarScrollButtons]]">
          <app-toolbar>
            <boo-wysiwyg-bold editor="[[editor]]"></boo-wysiwyg-bold>
            <boo-wysiwyg-underline editor="[[editor]]"></boo-wysiwyg-underline>
            <boo-wysiwyg-italic editor="[[editor]]"></boo-wysiwyg-italic>
            <boo-wysiwyg-strike editor="[[editor]]"></boo-wysiwyg-strike>
            <boo-wysiwyg-backcolor editor="[[editor]]"></boo-wysiwyg-backcolor>
            <boo-wysiwyg-forecolor editor="[[editor]]"></boo-wysiwyg-forecolor>
            <boo-wysiwyg-indent editor="[[editor]]"></boo-wysiwyg-indent>
            <boo-wysiwyg-outdent editor="[[editor]]"></boo-wysiwyg-outdent>
            <boo-wysiwyg-justify-left editor="[[editor]]"></boo-wysiwyg-justify-left>
            <boo-wysiwyg-justify-center editor="[[editor]]"></boo-wysiwyg-justify-center>
            <boo-wysiwyg-justify-right editor="[[editor]]"></boo-wysiwyg-justify-right>
            <boo-wysiwyg-justify-full editor="[[editor]]"></boo-wysiwyg-justify-full>
            <boo-wysiwyg-unordered-list editor="[[editor]]"></boo-wysiwyg-unordered-list>
            <boo-wysiwyg-ordered-list editor="[[editor]]"></boo-wysiwyg-ordered-list>
            <boo-wysiwyg-undo editor="[[editor]]"></boo-wysiwyg-undo>
            <boo-wysiwyg-redo editor="[[editor]]"></boo-wysiwyg-redo>
            <boo-wysiwyg-code editor="[[editor]]"></boo-wysiwyg-code>
            <boo-wysiwyg-p editor="[[editor]]"></boo-wysiwyg-p>
            <boo-wysiwyg-link editor="[[editor]]"></boo-wysiwyg-link>
            <boo-wysiwyg-unlink editor="[[editor]]"></boo-wysiwyg-unlink>
            <boo-wysiwyg-superscript editor="[[editor]]"></boo-wysiwyg-superscript>
            <boo-wysiwyg-subscript editor="[[editor]]"></boo-wysiwyg-subscript>
            <boo-wysiwyg-title editor="[[editor]]"></boo-wysiwyg-title>
            <boo-wysiwyg-remove-format editor="[[editor]]"></boo-wysiwyg-remove-format>
          </app-toolbar>
        </paper-tabs>
      </template>
      <template is="dom-if" if="[[noToolbarScrollable]]">
        <div>
          <boo-wysiwyg-bold editor="[[editor]]"></boo-wysiwyg-bold>
          <boo-wysiwyg-underline editor="[[editor]]"></boo-wysiwyg-underline>
          <boo-wysiwyg-italic editor="[[editor]]"></boo-wysiwyg-italic>
          <boo-wysiwyg-strike editor="[[editor]]"></boo-wysiwyg-strike>
          <boo-wysiwyg-backcolor editor="[[editor]]"></boo-wysiwyg-backcolor>
          <boo-wysiwyg-forecolor editor="[[editor]]"></boo-wysiwyg-forecolor>
          <boo-wysiwyg-indent editor="[[editor]]"></boo-wysiwyg-indent>
          <boo-wysiwyg-outdent editor="[[editor]]"></boo-wysiwyg-outdent>
          <boo-wysiwyg-justify-left editor="[[editor]]"></boo-wysiwyg-justify-left>
          <boo-wysiwyg-justify-center editor="[[editor]]"></boo-wysiwyg-justify-center>
          <boo-wysiwyg-justify-right editor="[[editor]]"></boo-wysiwyg-justify-right>
          <boo-wysiwyg-justify-full editor="[[editor]]"></boo-wysiwyg-justify-full>
          <boo-wysiwyg-unordered-list editor="[[editor]]"></boo-wysiwyg-unordered-list>
          <boo-wysiwyg-ordered-list editor="[[editor]]"></boo-wysiwyg-ordered-list>
          <boo-wysiwyg-undo editor="[[editor]]"></boo-wysiwyg-undo>
          <boo-wysiwyg-redo editor="[[editor]]"></boo-wysiwyg-redo>
          <boo-wysiwyg-code editor="[[editor]]"></boo-wysiwyg-code>
          <boo-wysiwyg-p editor="[[editor]]"></boo-wysiwyg-p>
          <boo-wysiwyg-link editor="[[editor]]"></boo-wysiwyg-link>
          <boo-wysiwyg-unlink editor="[[editor]]"></boo-wysiwyg-unlink>
          <boo-wysiwyg-superscript editor="[[editor]]"></boo-wysiwyg-superscript>
          <boo-wysiwyg-subscript editor="[[editor]]"></boo-wysiwyg-subscript>
          <boo-wysiwyg-title editor="[[editor]]"></boo-wysiwyg-title>
          <boo-wysiwyg-remove-format editor="[[editor]]"></boo-wysiwyg-remove-format>
        </div>
      </template>
      <boo-wysiwyg-e-editor 
        id="editor" 
        style-with-css
        value="{{value}}"
        placeholder="[[placeholder]]"></boo-wysiwyg-e-editor>
    `;
  }

  static get is() { return 'boo-wysiwyg-e'; }
  static get properties() {
    return {
      hideToolbarScrollButtons: {
        type: Boolean,
        reflectToAttribute: true,
      },
      noToolbarScrollable: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      editor: Object,
      placeholder: {
        type: String,
        reflectToAttribute: true,
        value: ""
      },
      value: {
        type: String,
        notify: true
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor = this.$.editor;
  }
}
window.customElements.define(BooWysiwygE.is, BooWysiwygE);
