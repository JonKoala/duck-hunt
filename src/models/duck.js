import GameObject from './_gameObject'

export default class extends GameObject {

  constructor(position, orientation) {
    super(position);

    this.spritesheet = ['2', 'S'];
    this.orientation = orientation;
    this.state = (this.orientation > 0) ? 1 : 0;
  }

}
