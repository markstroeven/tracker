import {trigger, state, animate, style, transition} from '@angular/core';

export function wizzardTransition() {
  return enterAnimation();
}

export function enterAnimation() {
  return trigger(
      'enterAnimation', [
        transition(':enter', [
          style({'max-height': '0px', opacity: 0}),
          animate('400ms', style({'max-height': '1000px', opacity: 1}))
        ]),
        transition(':leave', [
          style({'max-height': '1000px', opacity: 1}),
          animate('400ms', style({'max-height': '0px', opacity: 0}))
        ])
      ]
    );
}
