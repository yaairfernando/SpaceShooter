import Phaser from 'phaser';
import Background from '../Objects/Background';
import Button from '../Objects/Buttons';
import config from '../Config/config';
import { showForm } from '../API/Form';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  addText() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'IndieFlower',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.title = this.add.text(this.game.config.width * 0.5, 90, `SCORE: ${this.sys.game.globals.playerScore.getPlayerScore()}`, {
      fontFamily: 'IndieFlower',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  addRestartButton() {
    this.btnRestart = new Button(this, config.width / 2, config.height / 2 - 100, 'button2', 'button', 'Menu', 'Menu');
    this.btnRestart.y = 400;
  }

  addBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      const keys = ['space'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new Background(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  addTweens() {
    this.tweens.add({
      targets: this.title,
      y: 200,
      duration: 3000,
      ease: 'Power3',
    });
  }

  create() {
    this.addText();
    showForm.call(this, this);
    this.addTweens();
    this.addRestartButton();
    this.addBackground();
  }
}
