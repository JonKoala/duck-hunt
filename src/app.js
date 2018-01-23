import utils from './utils.js'

import Floor from './models/floor'
import Mark from './models/mark';
import Duck from './models/duck'

var mapLength = 80;
var maxDucks = 5;
var defaultMap = Array.from(Array(mapLength)).map(() => new Floor());

var map = [];
var ducks = [];
var mark = {};

var controller = {};

function start() {

  // start ducks
  for (let i=0; i<=maxDucks; i++) {
    let position = utils.getRandomNumber(0, mapLength-1);
    let orientation = utils.getRandomNumber(0, 1) ? 1 : -1;
    ducks.push(new Duck(position, orientation));
  }

  // start mark
  mark = new Mark(0);

  // start looking for events
  document.addEventListener('keydown', keyHandler);

  loop();
}

function loop() {

  // check if there is a target in sight
  mark.target = ducks.find(duck => duck.position === mark.position);

  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map = defaultMap.slice(0);

  // add ducks to map
  ducks.forEach(duck => {
    map[duck.position] = duck;
  });

  // add mark to map
  map[mark.position] = mark;

  // update url
  location.hash = map.join('');
}

function keyHandler(event) {
	if (event.key === 'ArrowRight' && mark.position < mapLength)
		mark.move(1)
	if (event.key === 'ArrowLeft' && mark.position > 0)
		mark.move(-1);
}

start();
