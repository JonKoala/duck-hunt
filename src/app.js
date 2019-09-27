import DuckHandler from './DuckHandler'
import InputHandler from './InputHandler'
import Map from './models/map'
import Mark from './models/mark'


// start assets

var mapLength = 100
var numDucks = 5
var ducksMaxRespawnTurns = 100

var map = {}
var mark = {}

var turnCount = 0

var duckHandler = {}
var inputHandler = {}

start()


// game routine logic

function start () {

  map = new Map(mapLength)
  mark = new Mark(0)

  duckHandler = new DuckHandler(numDucks, mapLength, ducksMaxRespawnTurns)

  inputHandler = new InputHandler()
  inputHandler.addEventListener('move', onUserMove)
  inputHandler.addEventListener('shoot', onUserShoot)

  loop()
}

function loop (timeStamp) {
  turnCount++

  duckHandler.updateDucks(turnCount)
  mark.target = duckHandler.locateDuck(mark.position)
  mark.update()

  print()

  requestAnimationFrame(loop)
}

function print () {

  map.reset()

  duckHandler.ducks.forEach(duck => map.addGameObject(duck))
  map.addGameObject(mark)

  location.hash = map
}


// handle input events

function onUserMove (e) {
  var nextPosition = mark.predictPosition(e.direction)
  if (nextPosition >= 0 && nextPosition <= mapLength)
    mark.move(e.direction)
}

function onUserShoot () {

  if (mark.state === 'cooldown')
    return

  mark.shoot()
  if (mark.target)
    duckHandler.killDuck(mark.target)
}
