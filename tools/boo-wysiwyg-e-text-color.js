import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-slider/paper-slider.js';
import {BooWysiwygETool} from '../boo-wysiwyg-e.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
export class BooWysiwygETextColor extends BooWysiwygETool {
  static get template() {
    return html`
    <style>
      div.used {
        @apply --layout-horizontal;
        @apply --layout-justify;
        padding-top: 8px;
      }
      [slot=dropdown-content] {
        padding: 10px 15px 10px 10px;
      }
      .colorMixer {
        @apply --layout-horizontal;
        @apply --layout-justify;
        @apply --layout-end;
      }
      .preview {
        width: 100px;
        height: 100px;
        background-color: black;
      }
      .controller {
        padding-top: 20px;
        margin: 0px -10px -10px 0px;
      }
      .red {
        --paper-slider-active-color: var(--l2t-paper-color-advanced-red, var(--paper-red-700));
        --paper-slider-knob-color: var(--l2t-paper-color-advanced-red, var(--paper-red-700));
        --paper-slider-pin-color: var(--l2t-paper-color-advanced-red, var(--paper-red-700));
      }
      .green {
        --paper-slider-active-color: var(--l2t-paper-color-advanced-green, var(--paper-green-700));
        --paper-slider-knob-color: var(--l2t-paper-color-advanced-green, var(--paper-green-700));
        --paper-slider-pin-color: var(--l2t-paper-color-advanced-green, var(--paper-green-700));
      }
      .blue {
        --paper-slider-active-color: var(--l2t-paper-color-advanced-blue, var(--paper-blue-700));
        --paper-slider-knob-color: var(--l2t-paper-color-advanced-blue, var(--paper-blue-700));
        --paper-slider-pin-color: var(--l2t-paper-color-advanced-blue, var(--paper-blue-700));
      }
    </style>
    <paper-menu-button id="dropdown" ignore-select=""> 

      <paper-icon-button slot="dropdown-trigger" title="[[title]]" icon="[[icon]]"></paper-icon-button>

      <div slot="dropdown-content">
        <div class="colorMixer">
          <div class="preview" style="background:[[value]];"></div>
          <div class="controller">
            <paper-slider min="0" pin="" max="255" class="red" immediate-value="{{_red}}" value="[[_red]]"></paper-slider>
            <paper-slider min="0" pin="" max="255" class="green" immediate-value="{{_green}}" value="[[_green]]"></paper-slider>
            <paper-slider min="0" pin="" max="255" class="blue" immediate-value="{{_blue}}" value="[[_blue]]"></paper-slider>
          </div>
        </div>
        <div class="used">
          <div>
            <template is="dom-repeat" items="[[values]]">
              <span style="background-color:[[item]]"></span>
            </template>
          </div>
          <paper-button on-click="select">选择</paper-button>
        </div>
      </div>
  </paper-menu-button>
`;
  }

  static get is() { return "boo-wysiwyg-e-text-color"; }

  static get properties() {
    return {
      _red: {
        type: Number,
        observer: "_colorChanged",
      },
      _green: {
        type: Number,
        observer: "_colorChanged",
      },
      _blue: {
        type: Number,
        observer: "_colorChanged",
      },
      title: {
        type: String,
        value: "文字颜色"
      },
      icon: {
        type: String,
        value: "boo-wysiwyg-e:format-color-text"
      },
      value: {
        type: String,
        notify: true,
      },
      values: {
        type: Array,
        value: []
      }
    };
  }

  _colorChanged() {
    if(this._red === '' || this._green === '' || this._blue === '') {
      return
    }
    var r = this._red.toString(16);
    r=r.length<2?"0"+r:r;
    var g = this._green.toString(16);
    g=g.length<2?"0"+g:g;
    var b = this._blue.toString(16);
    b=b.length<2?"0"+b:b;
    this.value = "#"+r+g+b;
  }

  select() {
    if (this.editor) {
      this.editor.exec("forecolor", this.value);
      this.$.dropdown.close();
    }
  }
}
window.customElements.define(BooWysiwygETextColor.is, BooWysiwygETextColor);
