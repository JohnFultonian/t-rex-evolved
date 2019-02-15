const POPULATION_SIZE = 1000;

const sigmoid = num => 1/(1+Math.exp(-num));

class RoboRex {
  init(start) {
    start();
  }

  tick(nextObstacle) {
    return _.range(POPULATION_SIZE).map(() => false);
  }

  finished(scores, restart) {
    setTimeout(() => restart(), 1000);
  }
}


window.roboRex = new RoboRex();
