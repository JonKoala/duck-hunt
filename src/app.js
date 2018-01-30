import Map from './models/map'
import Mark from './models/mark';
import Duck from './models/duck'

import utils from './utils'
import inputHandler from './inputHandler'


// start assets

var mapLength = 50;
var maxDucks = 5;

var turnCount = 0;
var map = {};
var ducks = [];
var mark = {};

start();


// game routine logic

function start() {

  // start the game objects
  map = new Map(mapLength);
  for (let i=0; i<=maxDucks; i++) {
    let position = utils.getRandomNumber(0, mapLength-1);
    let orientation = utils.getRandomNumber(0, 1) ? 1 : -1;
    ducks.push(new Duck(position, orientation));
  }
  mark = new Mark(0);

  // handle user inputs
  inputHandler.addEventListener('move', onUserMove);
  inputHandler.addEventListener('shoot', onUserShoot);

  loop();
}

function loop(timeStamp) {
  turnCount++;

  // update game objects

  ducks.forEach(function(duck, index, origin) {
    var otherDucks = origin.slice(0);
    otherDucks.splice(index, 1);

    duck.update(turnCount, otherDucks, mapLength);
  });

  mark.update(ducks);

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map.reset();

  // add game objects
  ducks.forEach(duck => map.addGameObject(duck));
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
  mark.shoot(ducks);
}
