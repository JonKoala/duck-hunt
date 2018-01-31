import GameObject from './_gameObject'
import utils from '../utils'

export default class extends GameObject {

  constructor(position) {
    super(position);

    this.idleTurns = 30;
    this.states = ['idle', 'walking'];
    this.changeState(this._getRandState());

    this.spritesheet = ['2', 'S'];
    this.orientation = this.getNextOrientation();
  }


  // routine

  update() {
    this.spriteIndex = (this.orientation > 0) ? 1 : 0;
    this.behaviour();
  }


  // state management

  changeState(state) {
    this.state = state;

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


  // AI

  getNextOrientation() {
    return utils.getRandomNumber(0, 1) ? 1 : -1;
  }

  getNextMoviment() {
    return utils.getRandomNumber(0, 1);
  }

  _getRandState() {
    var randIndex = utils.getRandomNumber(0, 1);
    return this.states[randIndex];
  }

}
