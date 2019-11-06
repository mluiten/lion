import { storiesOf, html, withKnobs, object, text } from '@open-wc/demoing-storybook';
import { css } from '@lion/core';

import '@lion/icon/lion-icon.js';
import '@lion/button/lion-button.js';
import '../lion-dialog.js';

const popupDemoStyle = css`
  .demo-box {
    width: 200px;
    background-color: white;
    border-radius: 2px;
    border: 1px solid grey;
    margin: 250px 0 0 250px;
    padding: 8px;
  }

  .demo-box_placements {
    display: flex;
    flex-direction: column;
    width: 173px;
    margin: 0 auto;
    margin-top: 68px;
  }

  lion-dialog {
    padding: 10px;
  }

  .demo-box__column {
    display: flex;
    flex-direction: column;
  }

  .popup {
    display: block;
    position: absolute;
    font-size: 16px;
    color: white;
    background-color: black;
    border-radius: 4px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    .popup {
      display: none;
    }
  }
`;

storiesOf('Dialog', module)
  .addDecorator(withKnobs)
  .add(
    'Button popup',
    () => html`
      <style>
        ${popupDemoStyle}
      </style>
      <div class="demo-box">
        <lion-dialog .popperConfig="${{ placement: 'top' }}">
          <lion-button slot="invoker">Popup</lion-button>
          <div slot="content" class="popup">Hello there!</div>
        </lion-dialog>
      </div>
    `,
  )
  .add(
    'placements',
    () => html`
      <style>
        ${popupDemoStyle}
      </style>
      <div class="demo-box_placements">
        <lion-dialog .popperConfig="${{ placement: 'top' }}">
          <lion-button slot="invoker">Top</lion-button>
          <div slot="content" class="popup">Its top placement</div>
        </lion-dialog>
        <lion-dialog .popperConfig="${{ placement: 'right' }}">
          <lion-button slot="invoker">Right</lion-button>
          <div slot="content" class="popup">Its right placement</div>
        </lion-dialog>
        <lion-dialog .popperConfig="${{ placement: 'bottom' }}">
          <lion-button slot="invoker">Bottom</lion-button>
          <div slot="content" class="popup">Its bottom placement</div>
        </lion-dialog>
        <lion-dialog .popperConfig="${{ placement: 'left' }}">
          <lion-button slot="invoker">Left</lion-button>
          <div slot="content" class="popup">Its left placement</div>
        </lion-dialog>
      </div>
    `,
  )
  .add(
    'Override popper configuration',
    () => html`
      <style>
        ${popupDemoStyle}
      </style>
      <p>Use the Storybook Knobs to dynamically change the popper configuration!</p>
      <div class="demo-box">
        <lion-dialog
          .popperConfig="${object('Popper Configuration', {
            placement: 'bottom-start',
            positionFixed: true,
            modifiers: {
              keepTogether: {
                enabled: true /* Prevents detachment of content element from reference element */,
              },
              preventOverflow: {
                enabled: true /* disables shifting/sliding behavior on secondary axis */,
                boundariesElement: 'viewport',
                padding: 16 /* when enabled, this is the viewport-margin for shifting/sliding */,
              },
              flip: {
                boundariesElement: 'viewport',
                padding: 4 /* viewport-margin for flipping on primary axis */,
              },
              offset: {
                enabled: true,
                offset: `0, 4px` /* horizontal and vertical margin (distance between popper and referenceElement) */,
              },
            },
          })}"
        >
          <lion-button slot="invoker">${text('Invoker text', 'Click me!')}</lion-button>
          <div slot="content" class="popup">${text('Content text', 'Hello, World!')}</div>
        </lion-dialog>
      </div>
    `,
  );
