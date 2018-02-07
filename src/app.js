import Map from './models/map'
import Mark from './models/mark';

import inputHandler from './inputHandler'
import duckHandler from './duckHandler'


// start assets

var mapLength = 50;
var numDucks = 5;
var ducksMaxRespawnTurns = 100;

var map = {};
var mark = {};

var turnCount = 0;

start();


// game routine logic

function start() {

  // start the game objects
  map = new Map(mapLength);
  mark = new Mark(0);
  duckHandler.start(numDucks, mapLength, ducksMaxRespawnTurns);

  // handle user inputs
  inputHandler.addEventListener('move', onUserMove);
  inputHandler.addEventListener('shoot', onUserShoot);

  loop();
}

function loop(timeStamp) {
  turnCount++;

  // update game objects
  duckHandler.updateDucks(turnCount);
  mark.target = duckHandler.locateDuck(mark.position);
  mark.update();

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map.reset();

  // add game objects
  duckHandler.ducks.forEach(duck => map.addGameObject(duck));
  map.addGameObject(mark);

  // update url
  location.hash = map;
}


// handle input events

function onUserMove(e) {
  var nextPosition = mark.predictPosition(e.direction);
  if (nextPosition >= 0 && nextPosition <= mapLength)
    mark.move(e.direction);
}

function onUserShoot() {

  // won't do anything if still in cooldown
  if (mark.state === 'cooldown')
    return;

  mark.shoot();

  // kill a duck, if it's in sight
  if (mark.target)
    duckHandler.killDuck(mark.target);
}
