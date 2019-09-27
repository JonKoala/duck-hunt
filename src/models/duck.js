import GameObject from './_gameObject'
import utils from '../utils'

export default class extends GameObject {

  constructor (position, orientation) {
    super(position, orientation, 'idle')

    this.spritesheet = ['2', 'S']
    this.idleTurns = 30
  }


  // routine

  update () {
    super.update()
    this.spriteIndex = (this.orientation === 1) ? 1 : 0
  }


  // state management

  changeState (state) {
    super.changeState(state)

    switch (state) {
      case 'idle':
        this.idleTurnsCount = 0
        this.behaviour = this.idleBehaviour
        break
      case 'walking':
        this.behaviour = this.walkBehaviour
        break
      case 'turn':
        this.behaviour = this.turnBehaviour
        break
    }
  }

  idleBehaviour () {
    this.idleTurnsCount++
    if (this.idleTurns <= this.idleTurnsCount)
      this.changeState(['walking', 'idle', 'turn'][utils.getRandomNumber(0, 2)])
  }

  walkBehaviour () {
    this.changeState('idle')
  }

  turnBehaviour () {
    this.orientation *= -1
    this.changeState('idle')
  }

}
