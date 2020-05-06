import Phaser from 'phaser';
import Background from '../Objects/Background';
import Player from '../Objects/Player';
import GunShip from '../Objects/GunShip';
import ChaserShip from '../Objects/ChaserShip';
import CarrierShip from '../Objects/CarrierShip';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.sys.game.globals.playerScore.resetScore();
    this.load.image('stars', 'assets/space.svg');
    this.load.spritesheet('enemy1', 'assets/spaceships/enemy1a.png', { frameWidth: 29, frameHeight: 40 });
    this.load.spritesheet('enemy2', 'assets/spaceships/enemy2a.png', { frameWidth: 57, frameHeight: 68 });
    this.load.spritesheet('enemy4', 'assets/spaceships/enemy4a.png', { frameWidth: 15, frameHeight: 25 });
    this.load.spritesheet('player', 'assets/spaceships/player2.png', { frameHeight: 25, frameWidth: 25 });
    this.load.spritesheet('explosion', 'assets/explosionB.png', { frameWidth: 50, frameHeight: 50 });
    this.load.image('laser-enemy', 'assets/spaceships/laser-enemy.png');
    this.load.image('torpedo', 'assets/spaceships/torpedo.png');
    this.load.image('laser-player', 'assets/spaceships/laser-player.png');

    this.load.audio('laser', 'assets/audio/laser.wav');
    this.load.audio('explode', 'assets/audio/explode.wav');
    this.load.audio('explode2', 'assets/audio/explode2.wav');
  }

  addKeys() {
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  create() {
    this.anims.create({
      key: 'enemy1',
      frames: this.anims.generateFrameNumbers('enemy1'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy2',
      frames: this.anims.generateFrameNumbers('enemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy4',
      frames: this.anims.generateFrameNumbers('enemy4'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'player',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('explode'),
        this.sound.add('explode2'),
      ],
      laser: this.sound.add('laser'),
    };

    this.backgrounds = [];
    for (let i = 0; i < 5; i = 1) { // create five scrolling backgrounds
      const bg = new Background(this, 'space', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'player',
    );

    this.addKeys();

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.event = this.time.addEvent({
      delay: 500,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 1) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 2) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    setInterval(() => {
      if (this.event.delay > 100) {
        this.event.delay -= 50;
      }
      console.log(this.event.delay);
    }, 10000);
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        this.sys.game.globals.playerScore.updateScore();
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();
      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i = 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
