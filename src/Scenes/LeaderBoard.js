import 'phaser';
import Button from '../Objects/Buttons';
import Background from '../Objects/Background';
import { getByClass } from '../Util/DOM';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }
  
  addBackground() {
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["space"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new Background(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  addText() {
    this.title = this.add.text(this.game.config.width * 0.5, 110, "LEADER BOARD", {
      fontFamily: 'IndieFlower',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }

  updateLeaderBoard() {
    let data = this.sys.game.globals.playerScore.showLeaderBoard()
    if (getByClass('.leader-board')) {
      getByClass('.leader-board').remove()
    }
    document.body.insertAdjacentElement("beforebegin", data);
    getByClass('.leader-board').classList.add('show');
  }

  createContainer() {
    this.model = this.sys.game.globals.model;
    const w = this.sys.game.config.width / 2;
    const h = this.sys.game.config.height / 2;
    let square = this.add.image(w, h, "square");
    let container = this.add.container(0, -20)
    container.height = 200
    container.add([square, this.title]);
  }

  create() {
    this.addBackground();
    this.addText();
    this.updateLeaderBoard();
    this.createContainer();
    this.menuButton = new Button(this, 500, 530, 'button2', 'button', 'Menu', 'Menu');
  }

}