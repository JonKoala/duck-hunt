import GameObject from './_gameObject'

export default class extends GameObject {

  constructor(position) {
    super(position);

    this.turnsToCooldown = 20;
    this.cooldownCount = 0;

    this.spritesheet = ['(  )', '(2)', '(S)', '(x)'];
    this.state = 0;
  }

  update(ducks) {

    // won't do anything if still in cooldown
    if (this.state === 3 && this.turnsToCooldown > this.cooldownCount) {
      this.cooldownCount++;
      return;
    }

    this.target = ducks.find(duck => duck.position === this.position);
  }

  set target(target) {
    if (target)
      this.state = (target.orientation > 0) ? 2 : 1;
    else
      this.state = 0;
  }

  shoot(ducks, map) {

    // won't do anything if still in cooldown
    if (this.state === 3)
      return;

    // kill a duck, if it's in sight
    var targetIndex = ducks.findIndex(duck => duck.position === this.position);
    if (targetIndex >= 0)
      ducks.splice(targetIndex, 1);

    // start weapon cooldown
    this.state = 3;
    this.cooldownCount = 0;
  }

}
