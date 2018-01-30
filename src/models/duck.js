import GameObject from './_gameObject'
import utils from '../utils'

export default class extends GameObject {

  constructor(position, orientation) {
    super(position);

    this.turnsToMove = 30;

    this.spritesheet = ['2', 'S'];
    this.orientation = orientation;
  }

  set orientation(value) {
    this._orientation = value;
    this.state = (this.orientation > 0) ? 1 : 0;
  }

  get orientation() {
    return this._orientation;
  }

  update(turnCount, ducks, mapLength) {

    if (turnCount % this.turnsToMove === 0) {

      // define new position
      var orientation = utils.getRandomNumber(0, 1) ? 1 : -1;
      var moviment = utils.getRandomNumber(0, 1);
      var newPosition = this.predictPosition(orientation, moviment);

      // if possible, move to new position
      if (newPosition > 0 && newPosition < mapLength) {
        var isPositionTaken = ducks.some(duck => duck.position === newPosition);
        if (!isPositionTaken)
          this.move(orientation, moviment);
      }
    }

  }

}
