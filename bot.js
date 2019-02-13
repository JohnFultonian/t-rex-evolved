const POPULATION_SIZE = 1000;

const sigmoid = num => 1/(1+Math.exp(-num));

class RoboRex {
  init(start) {
    start();
  }

  tick(nextObstacle) {
    return _.range(POPULATION_SIZE).map(() => _.random(0,1,true) < 0.01);
  }

  finished(scores, restart) {
    setTimeout(() => restart(), 1000);
  }
}


window.roboRex = new RoboRex();
