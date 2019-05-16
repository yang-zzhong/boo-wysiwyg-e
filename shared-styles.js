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

  :host([disabled]) .icon-btn {

  }
`;