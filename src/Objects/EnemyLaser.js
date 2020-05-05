import Entity from "./Entities";

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, laser = 'laser-enemy') {
    super(scene, x, y, laser);
    this.body.velocity.y = 200;
  }
}