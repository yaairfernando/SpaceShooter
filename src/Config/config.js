import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'container',
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
