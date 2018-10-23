import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="tool-shared-styles">
  <template>
    <style>
      :host([disabled]) paper-icon-button {
        color: #f0f0f0;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
