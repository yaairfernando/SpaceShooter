import Phaser from 'phaser';
import config from '../Config/config';
import GameScene from './GameScene';
import PreloaderScene from './PreloaderScene';
import MenuScene from './MenuScene';
import OptionsScene from './OptionsScene';
import GameOver from './GameOver';
import Model from '../Model';
import PlayerScore from '../Objects/PlayerScore';
import LeaderBoard from './LeaderBoard';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    const playerScore = new PlayerScore(this);
    const model = new Model();
    this.globals = { model, bgMusic: null, playerScore };
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Menu', MenuScene);
    this.scene.add('LeaderBoard', LeaderBoard);
    this.scene.add('Options', OptionsScene);
    this.scene.add('GameOver', GameOver);
    this.scene.add('Game', GameScene);
    this.scene.start('Preloader');
  }
}
