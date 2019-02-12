const POPULATION_SIZE = 1;

class RoboRex {
  init(start) {
    console.log('INIT');
    start();
  }

  tick(situation) {
    return _.range(POPULATION_SIZE).map(() => _.random(0,1,true) < 0.01);
  }

  finished(scores, restart) {
    console.log('FINISHED');
    setTimeout(() => restart(), 1000);
  }
}


window.roboRex = new RoboRex();
