const POPULATION_SIZE = 100;

class RoboRex {
  init(start) {
    start();
  }

  tick(situation) {
    return _.range(POPULATION_SIZE).map(() => _.random(0,1,true) < 0.01);
  }

  finished(scores, restart) {
    setTimeout(() => restart(), 1000);
  }
}


window.roboRex = new RoboRex();
