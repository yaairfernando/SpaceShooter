import Phaser from "phaser";
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import PreloaderScene from './Scenes/PreloaderScene';
import MenuScene from './Scenes/MenuScene';
import OptionsScene from './Scenes/OptionsScene';
import GameOver from './Scenes/GameOver';
import './Styles/Styles.scss'
import Model from "./Model";
import PlayerScore from './Objects/PlayerScore';
import LeaderBoard from './Scenes/LeaderBoard'

class Game extends Phaser.Game {
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

window.game = new Game();
