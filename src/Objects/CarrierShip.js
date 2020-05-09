import Phaser from 'phaser';
import Entity from './Entities';
import EnemyLaser from './EnemyLaser';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy4', 'CarrierShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
          'torpedo',
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.play('enemy4');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
