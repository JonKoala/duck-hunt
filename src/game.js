import DuckHandler from './duckHandler'
import InputHandler from './inputHandler'
import Map from './models/map'
import Mark from './models/mark'

export default class {

  constructor (options = {}) {
    options = Object.assign(
      Object.seal({
        mapLength: 100,
        numDucks: 5,
        duckRespawnTurns: 100
      }),
      options
    )
    Object.assign(this, options)

    this.map = new Map(this.mapLength)
    this.mark = new Mark(0)
  
    this.duckHandler = new DuckHandler(this.numDucks, this.mapLength, this.duckRespawnTurns);
  
    this.inputHandler = new InputHandler()
    this.inputHandler.addEventListener('move', this.onUserMove.bind(this))
    this.inputHandler.addEventListener('shoot', this.onUserShoot.bind(this))

    this.turnCount = 0
  }

  start () {
    this.loop()
  }
  
  loop () {
    this.turnCount++
  
    this.duckHandler.updateDucks(this.turnCount)
    this.mark.target = this.duckHandler.locateDuck(this.mark.position)
    this.mark.update()
  
    this.print()

    requestAnimationFrame(this.loop.bind(this))
  }
  
  print () {
    this.map.reset()
  
    this.duckHandler.ducks.forEach(duck => this.map.addGameObject(duck))
    this.map.addGameObject(this.mark)
  
    location.hash = this.map
  }
  
  
  // handle input events
  
  onUserMove (e) {
    var nextPosition = this.mark.predictPosition(e.direction)
    if (nextPosition >= 0 && nextPosition <= this.mapLength)
      this.mark.move(e.direction)
  }
  
  onUserShoot () {
    if (this.mark.state === 'cooldown')
      return
  
    this.mark.shoot()
    if (this.mark.target)
      this.duckHandler.killDuck(this.mark.target)
  }

}
