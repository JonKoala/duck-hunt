import Printable from './_printable'

export default class extends Printable {

  constructor(position) {
    super();

    this.position = position;

    this.spriteIndex = 0;
    this.spritesheet = [];
  }

  get sprite() {
    return this.spritesheet[this.spriteIndex];
  }

  move(orientation, units = 1) {
    this.orientation = orientation;
    this.position = this.predictPosition(orientation, units);
  }

  predictPosition(orientation, units = 1) {
    return this.position + (orientation * units);
  }

}
