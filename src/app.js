import utils from './utils.js'

import Floor from './models/floor'
import Mark from './models/mark';
import Duck from './models/duck'

var mapLength = 80;
var maxDucks = 5;

window.ducks = [];
var map = [];
var mark = {};

var controller = {};

function start() {

  // start ducks
  for (let i=0; i<=maxDucks; i++)
    ducks.push({duck: new Duck(), position: utils.getRandomNumber(0, mapLength-1)});

  // start mark
  mark = {mark: new Mark(), position: 0};

  document.addEventListener('keydown', keyHandler);

  loop();
}

function loop() {
  print();

  requestAnimationFrame(loop);
}

function print() {

  // reset map
  map = Array.from(Array(mapLength)).map(() => new Floor());

  // add ducks to map
  ducks.forEach(duckObj => {
    map[duckObj.position] = duckObj.duck;
  });

  // add mark to map
  map[mark.position] = mark.mark;

  // update url
  location.hash = map.join('');
}

function keyHandler(event) {
	if (event.key === 'ArrowRight' && mark.position < mapLength)
		mark.position += 1;
	if (event.key === 'ArrowLeft' && mark.position > 0)
		mark.position += -1;
}

start();
