import Map from './models/map'
import Mark from './models/mark';
import Duck from './models/duck'

import utils from './utils'
import inputHandler from './inputHandler'


// start assets

var mapLength = 50;
var maxDucks = 5;

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
    ducks.push(new Duck(position));
  }
  mark = new Mark(0);

  // handle user inputs
  inputHandler.addEventListener('move', onUserMove);
  inputHandler.addEventListener('shoot', onUserShoot);

  loop();
}

function loop(timeStamp) {

  // update ducks
  ducks.forEach(function(duck, index, origin) {
    if (duck.state === 'walking') {

      // predict duck's next moviment
      let nextOrientation = duck.getNextOrientation();
      let nextMoviment = duck.getNextMoviment();
      let nextPosition = duck.predictPosition(nextOrientation, nextMoviment);

      // check collision with other ducks
      let otherDucks = origin.slice(0);
      otherDucks.splice(index, 1);
      let willCollide = otherDucks.some(duck => duck.position === nextPosition);

      // change moviment, if necessary
      if (nextPosition < 0 || nextPosition > mapLength || willCollide)
        nextMoviment = 0;

      duck.move(nextOrientation, nextMoviment);
    }
    duck.update();
  });

  // update mark
  mark.target = ducks.find(duck => duck.position === mark.position);
  mark.update();

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

  // won't do anything if still in cooldown
  if (mark.state === 'cooldown')
    return;

  mark.shoot();

  // kill a duck, if it's in sight
  if (mark.target)
    ducks.splice(ducks.indexOf(mark.target), 1);
}
