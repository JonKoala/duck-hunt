import Floor from './floor'
import Printable from './_printable'

export default class extends Printable {

  constructor (size) {
    super()

    this.size = size
    this._default = Array.from(Array(this.size), () => new Floor())

    this.reset()
  }

  get sprite () {
    return this.tiles.join('')
  }

  reset () {
    this.tiles = this._default.slice(0)
  }

  addGameObject (gameObject) {
    this.tiles[gameObject.position] = gameObject
  }

}
