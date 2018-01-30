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
    this.position = this.predictPosition(orientation, units);
  }

  predictPosition(orientation, units = 1) {
    return this.position + (orientation * units);
  }

}
