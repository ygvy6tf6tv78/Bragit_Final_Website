/* eslint-disable */
const canvas = document.querySelector('canvas');

new RepixelXPhysics(canvas, {
  sources: [
    { url: './assets/bragit.png', background: 'light' },
    { url: './assets/repixelx.svg', background: 'transparent' },
  ],
  color: '#FFFFFF',
  gold: '#E5B521',
  particleSize: 1.45,
  mouseRadius: 210,
  hoverForce: 3.1,
  magnetForce: 6.4,
  spring: 0.085,
  friction: 0.835,
});
