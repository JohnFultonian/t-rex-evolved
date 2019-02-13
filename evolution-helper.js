const withProbability = (probability) => _.random(true) <= probability;

const MUTATION_RATE = 0.2;
const mutate = () => _.random(-1, 1, true);

const breed = (networkA, networkB, numOffspring = 1) => {
  return _.range(numOffspring).map(() => {
    let newOffspring = _.cloneDeep(networkA);

    // breed
    newOffspring.layers = newOffspring.layers.map((layer, i) => {
      return layer.map((node, j) => {
        let weights = node.weights.map((weight, k) => withProbability(0.5) ? weight : networkB.layers[i][j].weights[k]);
        let biases = node.biases;//.map((bias, k) => withProbability(0.5) ? bias : networkB.layers[i][j].biases[k]);
        return new Node(weights, biases);
      });
    });

    // mutate
    newOffspring.layers = [
      newOffspring.layers[0], //dont mutate input layer
      ..._.tail(newOffspring.layers).map((layer) => {
        return layer.map(node => {
          let weights = node.weights.map((weight) => withProbability(MUTATION_RATE) ? mutate() : weight);
          let biases = node.biases;// .map((bias) => withProbability(MUTATION_RATE) ? mutate() : bias);
          return new Node(weights, biases);
        });
      }) ]
    return newOffspring;
  });
}
