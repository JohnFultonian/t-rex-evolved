const POPULATION_SIZE = 5000;

const ELITISM = 0.1 // percent of population to keep (from top performers)
const NEW_RANDOM = 0.3 // percent of population to replace with random new population

const log = _.throttle((nextObstacle, normalizedInputs) => {});

class RoboRex {
  init(start) {
    this.generation = 1;
    this.agents = _.range(POPULATION_SIZE).map(() => new NeuralNetwork());
    start();
  }


  // neural network output of > 0.5 indicates rex should jump.
  tick(nextObstacle) {
    if(!nextObstacle) {
      // If no obstacles, take no action
      return this.agents.map(() =>  [false, false]);
    }

    let normalizedInputs = this.normalize(nextObstacle);

    log(nextObstacle, normalizedInputs);
    return this.agents.map(agent => agent.value(normalizedInputs));
  }

  finished(scores, restart) {
    console.log({ scores });
    const sortedScores = _.orderBy(scores, ['score'], ['desc']);
    console.log({sortedScores});
    const bestScore = sortedScores[0];
    const orderedAgents = sortedScores.map(score => this.agents[score.index]);
    console.log({bestScore});
    this.agents = this.evolve(orderedAgents);
    this.generation++;
    console.log(this.generation);
    setTimeout(() => restart(), 1000);
  }

  evolve(orderedAgents) {
    let bestAgent = orderedAgents[0].name;
    console.log({bestAgent});

    let agentsToPreserve = _.take(orderedAgents, Math.floor(orderedAgents.length * ELITISM));
    console.log('----------- EVOLVE -----------');
    console.log({agentsToPreserve: agentsToPreserve.map(agentsToPreserve => agentsToPreserve.name)});
    let freshAgents = _.range(Math.floor(orderedAgents.length * NEW_RANDOM)).map(() => new NeuralNetwork());
    let requiredOffspring = POPULATION_SIZE - agentsToPreserve.length  - freshAgents.length;
    let eliteOffspring = Math.floor(requiredOffspring / 2);

    let offSpring = [];
    let currentlyBreeding = 0;

    // breed amongst elites
    while(offSpring.length < eliteOffspring) {
      offSpring.push(breed(agentsToPreserve[currentlyBreeding], agentsToPreserve[currentlyBreeding + 1])[0]);
      currentlyBreeding++;
      if(currentlyBreeding >= agentsToPreserve.length - 1) {
        currentlyBreeding = 0;
      }
    }

    // breed amongst randoms
    currentlyBreeding = 0;
    while(offSpring.length < requiredOffspring) {
      offSpring.push(breed(agentsToPreserve[currentlyBreeding], orderedAgents[_.random(0, orderedAgents.length - 1)])[0]);
      currentlyBreeding++;
      if(currentlyBreeding >= agentsToPreserve.length - 1) {
        currentlyBreeding = 0;
      }
    }

    console.log({
      preserved: agentsToPreserve.length,
      bred: offSpring.length,
      fresh: freshAgents.length,
      total: agentsToPreserve.length+offSpring.length+freshAgents.length,
    });
    console.log({agentsToPreserve: agentsToPreserve.map(agentsToPreserve => agentsToPreserve.name)});

    return [...agentsToPreserve, ...offSpring, ...freshAgents];
  }


  normalize(obstacle) {
    return [
      obstacle.distance / 1000,
      obstacle.bottom / 100,
    ];
  }
}


window.roboRex = new RoboRex();
