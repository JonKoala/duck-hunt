
export default class {

  constructor() {
    this._sprite = null;
  }

  get sprite() {
    return this._sprite;
  }

  toString() {
    return this.sprite.toString();
  }
}
