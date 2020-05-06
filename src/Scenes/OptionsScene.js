import Phaser from 'phaser';
import Button from '../Objects/Buttons';
import Background from '../Objects/Background';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  getBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      const keys = ['space'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new Background(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  create() {
    this.getBackground();

    this.model = this.sys.game.globals.model;
    const w = this.sys.game.config.width / 2;
    const h = this.sys.game.config.height / 2;
    const square = this.add.image(w, h, 'square');
    this.text = this.add.text(w - 100, h - 180, 'Options', { fontSize: 50, fontFamily: 'IndieFlower' });
    this.musicButton = this.add.image(w - 100, h - 80, 'check');
    this.musicText = this.add.text(w, h - 90, 'Music Enabled', { fontSize: 24, fontFamily: 'IndieFlower' });

    this.soundButton = this.add.image(w - 100, h, 'check');
    this.soundText = this.add.text(w, h - 10, 'Sound Enabled', { fontSize: 24, fontFamily: 'IndieFlower' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });


    this.menuButton = new Button(this, 500, 530, 'button2', 'button', 'Menu', 'Menu');
    const container = this.add.container(0, -20);
    container.height = 200;
    container.add([square, this.text, this.musicButton, this.musicText, this.soundButton, this.soundText]);
    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('no-check');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('check');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('no-check');
    } else {
      this.soundButton.setTexture('check');
    }
  }
}
