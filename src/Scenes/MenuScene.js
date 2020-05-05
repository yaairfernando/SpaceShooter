import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Buttons';
import Background from '../Objects/Background';
import { getByClass } from '../Util/DOM';
import { hideForm } from '../API/Form';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  getLeaderBoard() {
    this.sys.game.globals.playerScore.getScores();
    this.sys.game.globals.playerScore.showLeaderBoard();
  }

  hideLeaderBoard() {
    if (getByClass('.leader-board')) {
      getByClass('.leader-board').classList.remove('show');
    }
  }

  preload() {
    console.log('Menu Scene');
    hideForm();
    this.load.image('space', 'assets/space.svg');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('space2', 'assets/planets/planet-3.png');
    this.load.image('space3', 'assets/planets/planet-5.png');
    this.load.image('space4', 'assets/planets/planet-4.png');
    this.getLeaderBoard();
    this.hideLeaderBoard();
  }

  addBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      const keys = ['space', 'stars'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new Background(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  addButtons() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'button2', 'button', 'Start', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'button2', 'button', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'button2', 'button', 'LeaderBoard', 'LeaderBoard');
  }

  addPlanet(target, duration, ease, delay) {
    target.y = -300;
    this.tweens.add({
      targets: target,
      y: 1000,
      duration,
      ease,
      delay,
      repeat: -1,
    });
  }

  create() {
    this.addButtons();
    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('audio', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.addBackground();

    // addPlanets()
    const space2 = this.add.image(Phaser.Math.Between(0, 310), 100, 'space2').setScale(0.1);
    const space3 = this.add.image(Phaser.Math.Between(800, 1000), 100, 'space3').setScale(0.2);
    const space4 = this.add.image(Phaser.Math.Between(750, 1000), 100, 'space4').setScale(0.15);
    this.addPlanet(space2, 40000, 'Pointer1', 25000);
    this.addPlanet(space3, 50000, 'Pointer2', 1000);
    this.addPlanet(space4, 80000, 'Pointer3', 50000);
  }
}
