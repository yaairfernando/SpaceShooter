import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.load.image('logoP', 'assets/logoP.png');
    this.load.image('button2', 'assets/button2.png');
    this.load.image('square', 'assets/square.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('back', 'assets/preview2.png');
    this.load.image('check', 'assets/check.png');
    this.load.image('no-check', 'assets/no-check.png');
    this.load.audio('audio', 'assets/audio/battleThemeA.mp3');

    const w = this.sys.game.config.width / 2 - 175;
    const h = this.sys.game.config.height / 2 - 30;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x44a216, 0.8);
    progressBox.fillRect(w, h, 340, 50);
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(w + 20, h + 10, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.src}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);
  }

  create() {
    const width = this.sys.game.config.width / 2;
    const height = this.sys.game.config.height / 2;
    this.add.image(width, height, 'back');
    const logo = this.add.image(width, height, 'logoP');
    logo.y = 0;
    this.tweens.add({
      targets: logo,
      y: height,
      duration: 500,
      ease: 'Pointer1',
    });
  }


  ready() {
    this.scene.start('Menu');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Menu');
    }
  }
}
