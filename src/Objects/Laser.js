import Entity from './Entities';

export default class Laser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser-player');
    this.body.velocity.y = -200;
  }
}
