import utils from './utils'
import Duck from './models/duck'

export default {

  start(numDucks, mapLength) {

    this.mapLength = mapLength;
    this.numDucks = numDucks;

    // start ducks
    this.ducks = [];
    for (let i=0; i<this.numDucks; i++)
      this.addDuck();
  },

  addDuck() {
    var newDuck = new Duck(this.getUnocupiedMapPosition(), this.getRandomOrientation(), this.getRandomState());
    this.ducks.push(newDuck);
  },

  killDuck(duck) {
    var index = this.ducks.indexOf(duck);
    this.ducks.splice(index, 1);
  },

  updateDucks() {
    this.ducks.forEach(duck => {
      if (duck.state === 'walking') {

        // predict duck's next moviment
        let nextOrientation = this.getRandomOrientation();
        let nextMoviment = this.getRandomMoviment();
        let nextPosition = duck.predictPosition(nextOrientation, nextMoviment);

        // change moviment, if it's going to colide with other duck
        if (nextPosition < 0 || nextPosition > this.mapLength || this.checkCollision(nextPosition))
          nextMoviment = 0;

        duck.move(nextOrientation, nextMoviment);
      }
      duck.update();
    });
  },


  // utils

  locateDuck(position) {
    return this.ducks.find(duck => duck.position === position);
  },

  checkCollision(position) {
    return Boolean(this.locateDuck(position));
  },

  getUnocupiedMapPosition() {
    if (this.mapLength <= this.numDucks)
      throw 'Too many ducks!';

    var randPosition;
    do {
       randPosition = this.getRandomMapPosition();
     } while(this.checkCollision(randPosition));

     return randPosition;
  },


  // rng

  getRandomMapPosition() {
    return utils.getRandomNumber(0, this.mapLength-1);
  },

  getRandomOrientation() {
    return utils.getRandomNumber(0, 1) ? 1 : -1;
  },

  getRandomMoviment() {
    return utils.getRandomNumber(0, 1);
  },

  getRandomState() {
    var randIndex = utils.getRandomNumber(0, Duck.states.length-1);
    return Duck.states[randIndex];
  }

}