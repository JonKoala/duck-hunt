import GameObject from './_gameObject'

export default class extends GameObject {

  constructor (position) {
    super(position, 0, 'normal')

    this.spritesheet = ['(..)', '(2)', '(S)', '(x)']
    this.cooldownTurns = 20
  }


  // state management

  changeState (state) {
    super.changeState(state)

    switch(state) {
      case 'normal':
        this.behaviour = this.normalBehaviour
        break
      case 'cooldown':
        this.cooldownTurnsCount = 0
        this.behaviour = this.cooldownBehaviour
        break
    }
  }

  normalBehaviour () {
    this.spriteIndex = 0

    if (this.target)
      this.spriteIndex = (this.target.orientation > 0) ? 2 : 1
  }

  cooldownBehaviour () {
    this.spriteIndex = 3

    this.cooldownTurnsCount++
    if (this.cooldownTurns <= this.cooldownTurnsCount)
      this.changeState('normal')
  }


  // events

  shoot () {
    this.changeState('cooldown')
  }

}
