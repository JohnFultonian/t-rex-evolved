const POPULATION_SIZE = 100;

const ELITISM = 0.2 // percent of population to keep (from top performers)
const NEW_RANDOM = 0.2 // percent of population to replace with random new population

class RoboRex {
  init(start) {
    this.generation = 1;
    this.agents = _.range(POPULATION_SIZE).map(() => new NeuralNetwork());
    start();
  }


  // neural network output of > 0.5 indicates rex should jump.
  tick(nextObstacle) {
    return nextObstacle ?
      //this.agents.map(agent => agent.value(Object.values(nextObstacle).map(i => sigmoid(i))) > 0.5) :
      this.agents.map(agent => agent.value([nextObstacle.distance, nextObstacle.bottom]) > 0.5) :
      this.agents.map(() => false) // If no obstacles. Don't jump
  }

  finished(scores, restart) {
    this.agents = this.evolve(_.orderBy(scores, ['score'], ['desc']));
    this.generation++;
    console.log(this.generation);
    setTimeout(() => restart(), 1000);
  }

  evolve(orderedScores) {
    let orderedAgents = orderedScores.map((score) => _.cloneDeep(this.agents[score.index]));

    let agentsToPreserve = _.take(orderedAgents, Math.floor(orderedAgents.length * ELITISM));
    let freshAgents = _.range(Math.floor(orderedAgents.length * NEW_RANDOM)).map(() => new NeuralNetwork());
    let requiredOffspring = POPULATION_SIZE - agentsToPreserve.length  - freshAgents.length;

    let offSpring = [];
    let currentlyBreeding = 0;
    while(offSpring.length < requiredOffspring) {
      offSpring.push(breed(agentsToPreserve[currentlyBreeding], agentsToPreserve[currentlyBreeding + 1])[0]);
      currentlyBreeding++;
      if(currentlyBreeding >= agentsToPreserve.length - 1);
        currentlyBreeding = 0;
    }

    return [...agentsToPreserve, ...offSpring, ...freshAgents];
  }
}


window.roboRex = new RoboRex();
