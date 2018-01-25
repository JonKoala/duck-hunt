import Printable from './_printable'

export default class extends Printable {

  constructor(position) {
    super();

    this.position = position;

    this.state = 0;
    this.spritesheet = [];
  }

  get sprite() {
    return this.spritesheet[this.state];
  }

  move(orientation, units = 1) {
    this.orientation = orientation;
    this.position = this._getNewPosition(orientation, units);
  }

  _getNewPosition(orientation, units) {
    return this.position + (orientation * units);
  }

}
