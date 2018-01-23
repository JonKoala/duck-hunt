import GameObject from './_gameObject'

export default class extends GameObject {

  constructor(position) {
    super(position);

    this.spritesheet = ['(  )', '(2)', '(S)'];
    this.state = 0;
  }

  set target(target) {
    if (target)
      this.state = (target.orientation > 0) ? 2 : 1;
    else
      this.state = 0;
  }

}
