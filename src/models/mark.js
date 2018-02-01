import GameObject from './_gameObject'

export default class extends GameObject {

  constructor(position) {
    super(position);

    this.cooldownTurns = 20;
    this.states = ['normal', 'cooldown'];
    this.changeState('normal');

    this.target = null;

    this.spritesheet = ['(  )', '(2)', '(S)', '(x)'];
    this.spriteIndex = 0;
  }


  // routine

  update() {
    this.behaviour();
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
