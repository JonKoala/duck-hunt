import GameObject from './_gameObject'
import utils from '../utils'

export default class extends GameObject {


  static get spritesheet() {
    return ['2', 'S'];
  }

  static get states() {
    return ['idle', 'walking'];
  }

  constructor(position, orientation, state) {
    super(position, orientation, state);

    this.idleTurns = 30;
  }


  // routine

  update() {
    super.update();
    this.spriteIndex = (this.orientation > 0) ? 1 : 0;
  }


  // state management

  changeState(state) {
    super.changeState(state);

    switch(state) {
      case 'idle':
        this.idleTurnsCount = 0;
        this.behaviour = this.idleBehaviour;
        break;
      case 'walking':
        this.behaviour = this.walkBehaviour;
        break;
    }
  }

  idleBehaviour() {
    this.idleTurnsCount++;
    if (this.idleTurns <= this.idleTurnsCount)
      this.changeState('walking');
  }

  walkBehaviour() {
    this.changeState('idle');
  }

}
