import {css} from 'lit-element';

export const sharedStyles = css`
  :host {
    display: inline-block;
  }

  :host([disabled]) mwc-icon-button {
    color: var(--boo-wysiwyg-disabled-icon-color, #e0e0e0);
  }

  :host([active]) mwc-icon-button {
    background-color: var(--boo-wysiwyg-icon-bg-color, #e0e0e0);
    color: var(--boo-wysiwyg-active-icon-color, blue);
  }
`;

export const containerStyles = css`
  :host {
    vertical-align: center;
  }
`;