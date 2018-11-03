import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-tabs/paper-tabs.js';
import './editarea.js';
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
          @apply --boo-wysiwyge-e-toolbar;
        }
        boo-wysiwyg-e-editarea {
          overflow: auto;
          padding: 10px;
        }
      </style>
      <template is="dom-if" if="[[!noToolbarScrollable]]">
        <paper-tabs scrollable hide-scroll-buttons="[[hideToolbarScrollButtons]]">
          <app-toolbar>
            <boo-wysiwyg-bold editarea="[[editarea]]"></boo-wysiwyg-bold>
            <boo-wysiwyg-underline editarea="[[editarea]]"></boo-wysiwyg-underline>
            <boo-wysiwyg-italic editarea="[[editarea]]"></boo-wysiwyg-italic>
            <boo-wysiwyg-strike editarea="[[editarea]]"></boo-wysiwyg-strike>
            <boo-wysiwyg-backcolor editarea="[[editarea]]"></boo-wysiwyg-backcolor>
            <boo-wysiwyg-forecolor editarea="[[editarea]]"></boo-wysiwyg-forecolor>
            <boo-wysiwyg-indent editarea="[[editarea]]"></boo-wysiwyg-indent>
            <boo-wysiwyg-outdent editarea="[[editarea]]"></boo-wysiwyg-outdent>
            <boo-wysiwyg-justify-left editarea="[[editarea]]"></boo-wysiwyg-justify-left>
            <boo-wysiwyg-justify-center editarea="[[editarea]]"></boo-wysiwyg-justify-center>
            <boo-wysiwyg-justify-right editarea="[[editarea]]"></boo-wysiwyg-justify-right>
            <boo-wysiwyg-justify-full editarea="[[editarea]]"></boo-wysiwyg-justify-full>
            <boo-wysiwyg-unordered-list editarea="[[editarea]]"></boo-wysiwyg-unordered-list>
            <boo-wysiwyg-ordered-list editarea="[[editarea]]"></boo-wysiwyg-ordered-list>
            <boo-wysiwyg-undo editarea="[[editarea]]"></boo-wysiwyg-undo>
            <boo-wysiwyg-redo editarea="[[editarea]]"></boo-wysiwyg-redo>
            <boo-wysiwyg-code editarea="[[editarea]]"></boo-wysiwyg-code>
            <boo-wysiwyg-p editarea="[[editarea]]"></boo-wysiwyg-p>
            <boo-wysiwyg-title editarea="[[editarea]]"></boo-wysiwyg-title>
            <boo-wysiwyg-link editarea="[[editarea]]"></boo-wysiwyg-link>
            <boo-wysiwyg-unlink editarea="[[editarea]]"></boo-wysiwyg-unlink>
            <boo-wysiwyg-superscript editarea="[[editarea]]"></boo-wysiwyg-superscript>
            <boo-wysiwyg-subscript editarea="[[editarea]]"></boo-wysiwyg-subscript>
            <boo-wysiwyg-remove-format editarea="[[editarea]]"></boo-wysiwyg-remove-format>
          </app-toolbar>
        </paper-tabs>
      </template>
      <template is="dom-if" if="[[noToolbarScrollable]]">
        <div>
          <boo-wysiwyg-bold editarea="[[editarea]]"></boo-wysiwyg-bold>
          <boo-wysiwyg-underline editarea="[[editarea]]"></boo-wysiwyg-underline>
          <boo-wysiwyg-italic editarea="[[editarea]]"></boo-wysiwyg-italic>
          <boo-wysiwyg-strike editarea="[[editarea]]"></boo-wysiwyg-strike>
          <boo-wysiwyg-backcolor editarea="[[editarea]]"></boo-wysiwyg-backcolor>
          <boo-wysiwyg-forecolor editarea="[[editarea]]"></boo-wysiwyg-forecolor>
          <boo-wysiwyg-indent editarea="[[editarea]]"></boo-wysiwyg-indent>
          <boo-wysiwyg-outdent editarea="[[editarea]]"></boo-wysiwyg-outdent>
          <boo-wysiwyg-justify-left editarea="[[editarea]]"></boo-wysiwyg-justify-left>
          <boo-wysiwyg-justify-center editarea="[[editarea]]"></boo-wysiwyg-justify-center>
          <boo-wysiwyg-justify-right editarea="[[editarea]]"></boo-wysiwyg-justify-right>
          <boo-wysiwyg-justify-full editarea="[[editarea]]"></boo-wysiwyg-justify-full>
          <boo-wysiwyg-unordered-list editarea="[[editarea]]"></boo-wysiwyg-unordered-list>
          <boo-wysiwyg-ordered-list editarea="[[editarea]]"></boo-wysiwyg-ordered-list>
          <boo-wysiwyg-undo editarea="[[editarea]]"></boo-wysiwyg-undo>
          <boo-wysiwyg-redo editarea="[[editarea]]"></boo-wysiwyg-redo>
          <boo-wysiwyg-code editarea="[[editarea]]"></boo-wysiwyg-code>
          <boo-wysiwyg-p editarea="[[editarea]]"></boo-wysiwyg-p>
          <boo-wysiwyg-title editarea="[[editarea]]"></boo-wysiwyg-title>
          <boo-wysiwyg-link editarea="[[editarea]]"></boo-wysiwyg-link>
          <boo-wysiwyg-unlink editarea="[[editarea]]"></boo-wysiwyg-unlink>
          <boo-wysiwyg-superscript editarea="[[editarea]]"></boo-wysiwyg-superscript>
          <boo-wysiwyg-subscript editarea="[[editarea]]"></boo-wysiwyg-subscript>
          <boo-wysiwyg-remove-format editarea="[[editarea]]"></boo-wysiwyg-remove-format>
        </div>
      </template>
      <boo-wysiwyg-editarea 
        id="editarea" 
        focused="{{focus}}"
        custom-style="custom-style"
        readonly="{{readonly}}"
        on-input="_input"
        enable-absolute-position-editarea="{{enableAbsolutePositionEditor}}"
        default-paragraph-separator="{{defaultParagraphSeparator}}"
        style-with-css="{{styleWithCss}}"
        enable-inline-table-editing="{{enableInlineTableEditing}}"
        value="{{value}}"
        placeholder="[[placeholder]]"></boo-wysiwyg-editarea>
    `;
  }

  static get is() { return 'boo-wysiwyg-e'; }
  static get properties() {
    return {
      focus: {
        type: Boolean,
        observer: '_focusChanged'
      },
      hideToolbarScrollButtons: {
        type: Boolean,
        reflectToAttribute: true,
      },
      readonly: {
        type: Boolean,
        reflectToAttribute: true
      },
      enableAbsolutePositionEditor: {
        type: Boolean,
        reflectToAttribute: true,
      },
      enableInlineTableEditing: {
        type: Boolean,
        reflectToAttribute: true,
      },
      defaultParagraphSeparator: {
        type: String,
        reflectToAttribute: true,
      },
      styleWithCss: {
        type: Boolean,
        reflectToAttribute: true,
      },
      noToolbarScrollable: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      editarea: Object,
      placeholder: {
        type: String,
        reflectToAttribute: true
      },
      value: {
        type: String,
        notify: true
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.editarea = this.$.editarea;
  }

  _focusChanged(focus) {
    console.log(focus);
  }

  _input() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(this.$.editarea.index());
    }, 5000);
  }
}
window.customElements.define(BooWysiwygE.is, BooWysiwygE);
