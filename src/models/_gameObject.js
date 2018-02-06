import Printable from './_printable'

export default class extends Printable {

  static get spritesheet() {
    return [];
  }

  static get states() {
    return [];
  }

  constructor(position, orientation, state) {
    super();

    this.spriteIndex = 0;

    this.position = position;
    this.orientation = orientation;
    this.changeState(state);
  }


  // routine

  update() {
    this.behaviour();
  }


  // engine

  get sprite() {
    return this.constructor.spritesheet[this.spriteIndex];
  }

  move(orientation, units = 1) {
    this.orientation = orientation;
    this.position = this.predictPosition(orientation, units);
  }


  // state management

  changeState(state) {
    this.state = state;

    this.behaviour = this.nullBehaviour;
  }

  nullBehaviour() { }


  // utils

  predictPosition(orientation, units = 1) {
    return this.position + (orientation * units);
  }

}
