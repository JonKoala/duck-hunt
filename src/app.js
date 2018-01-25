import Map from './models/map'
import Mark from './models/mark';
import Duck from './models/duck'

import utils from './utils.js'


// start assets

var mapLength = 50;
var maxDucks = 5;

var turnCount = 0;
var map = new Map(mapLength);
var ducks = [];
var mark = {};

start();


// game routine logic

function start() {

  // start the game objects
  for (let i=0; i<=maxDucks; i++) {
    let position = utils.getRandomNumber(0, mapLength-1);
    let orientation = utils.getRandomNumber(0, 1) ? 1 : -1;
    ducks.push(new Duck(position, orientation));
  }
  mark = new Mark(0);

  // start looking for events
  document.addEventListener('keydown', keyHandler);

  loop();
}

function loop(timeStamp) {
  turnCount++;

  // ducks moviment logic
  ducks.forEach(function(duck, index, origin) {
    var otherDucks = origin.slice(0);
    otherDucks.splice(index, 1);

    duck.update(turnCount, otherDucks, mapLength);
  });

  // check if there is a target in sight
  mark.target = ducks.find(duck => duck.position === mark.position);

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map.reset();

  // add game objects
  ducks.forEach(duck => {
    map.addGameObject(duck);
  });
  map.addGameObject(mark);

  // update url
  location.hash = map;
}

function keyHandler(event) {
	if (event.key === 'ArrowRight' && mark.position < mapLength)
		mark.move(1)
	if (event.key === 'ArrowLeft' && mark.position > 0)
		mark.move(-1);
}
