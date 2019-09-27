import Duck from './models/duck'
import utils from './utils'

export default class {

  constructor (numDucks, mapLength, duckRespawnTurns) {
    this.numDucks = numDucks
    this.mapLength = mapLength
    this.maxRespawnTurns = duckRespawnTurns

    this.ducks = []
  }

  addDuck () {
    var newDuck = new Duck(this.getUnocupiedMapPosition(), [1, -1][utils.getRandomNumber(0, 1)])
    this.ducks.push(newDuck)
  }

  killDuck (duck) {
    var index = this.ducks.indexOf(duck)
    this.ducks.splice(index, 1)
  }

  updateDucks (turnCount) {

    this.ducks.forEach(duck => {

      // prevents duck from colliding or going out of bounds
      if (duck.state === 'walking') {
        let nextPosition = duck.predictPosition(duck.orientation)
        if (nextPosition >= 0 && nextPosition <= this.mapLength && !this.checkCollision(nextPosition))
          duck.move(duck.orientation)
      }

      duck.update()
    })

    // respawn logic
    if (this.ducks.length < this.numDucks && !(turnCount % this.maxRespawnTurns))
      this.addDuck()
  }


  // utils

  locateDuck (position) {
    return this.ducks.find(duck => duck.position === position)
  }

  checkCollision (position) {
    return Boolean(this.locateDuck(position))
  }

  getUnocupiedMapPosition () {

    if (this.mapLength <= this.numDucks)
      throw new Error('Too many ducks!')

    var mapPositions = [ ...Array(this.mapLength).keys() ]
    var ducksPositions = this.ducks.map(d => d.position)
    var availablePositions = mapPositions.filter(p => !ducksPositions.includes(p))

    return availablePositions[utils.getRandomNumber(0, availablePositions.length - 1)]
  }

}
