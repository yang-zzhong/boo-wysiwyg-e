import {css} from 'lit-element';

export const sharedStyles = css`
  .icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    display: inline-block;
    position: relative;
  }

  .icon-btn:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, .1);
  }

  .icon-btn svg {
    margin: 4px;
  }

  :host {
    display: inline-block;
  }

  :host([disabled]) .icon-btn {
    fill: #e0e0e0;
  }

  :host([active]) .icon-btn {
    background-color: #e0e0e0;
    fill: blue;
    color: blue;
  }
`;

export const containerStyles = css`
  :host {
    vertical-align: center;
  }
`;