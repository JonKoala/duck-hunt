import Printable from './_printable'
import Floor from './floor'

export default class extends Printable {

  constructor(size) {
    super();

    this.size = size;
    this._default = Array.from(Array(this.size)).map(() => new Floor());

    this.reset();
  }

  get sprite() {
    return this.tiles.join('');
  }

  reset() {
    this.tiles = this._default.slice(0);
  }

  addGameObject(gameObject) {
    this.tiles[gameObject.position] = gameObject;
  }

}
