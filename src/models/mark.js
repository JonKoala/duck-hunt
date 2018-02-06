import GameObject from './_gameObject'

export default class extends GameObject {

  static get spritesheet() {
    return ['(  )', '(2)', '(S)', '(x)'];
  }

  static get states() {
    return ['normal', 'cooldown'];
  }

  constructor(position) {
    super(position, 0, 'normal');

    this.cooldownTurns = 20;
  }


  // state management

  changeState(state) {
    this.state = state;

    switch(state) {
      case 'normal':
        this.behaviour = this.normalBehaviour;
        break;
      case 'cooldown':
        this.cooldownTurnsCount = 0;
        this.behaviour = this.cooldownBehaviour;
        break;
    }
  }

  normalBehaviour() {
    if (this.target)
      this.spriteIndex = (this.target.orientation > 0) ? 2 : 1;
    else
      this.spriteIndex = 0;
  }

  cooldownBehaviour() {
    this.spriteIndex = 3;

    this.cooldownTurnsCount++;
    if (this.cooldownTurns <= this.cooldownTurnsCount)
      this.changeState('normal');
  }


  // events

  shoot() {
    this.changeState('cooldown');
  }

}
