const sigmoid = num => 1/(1+Math.exp((-num) / 1));


const INPUT_LAYER_SIZE = 2;
const HIDDEN_LAYER_SIZE = 2
const OUTPUT_LAYER_SIZE = 1;


// Represents a node in a neural network
// weights and biases are both arrays
// the size of the weight and bias arrays should be equal to the number of inputs coming into the node
class Node {
  constructor(weights, biases, activationFunction = sigmoid) {
    this.weights = weights;
    this.biases = biases;
    this.activationFunction = activationFunction;
  }

  value(input) {
    let inputsArray = _.isArray(input) ? input : [input];
    return this.activationFunction(inputsArray.reduce((accumulator, value, index) => accumulator + this.weights[index]*input + this.biases[index],0));
  }
}

// An input nodes value is identical to its input value
// (1 weight, 0 bias, identity activation function)
const createInputNode = () => new Node([1], [0], i => i);

const createRandomNode = (inputSize) => new Node(
    _.range(inputSize).map(() => _.random(-1, 1, true)),
  _.range(inputSize).map(() => 0)//_.random(-1, 1, true))
);

// Represents a Neural Network
// Each layer is an array of nodes
// A Neural network is by default constructed using random nodes
class NeuralNetwork {
  constructor() {
    this.layers = [
      _.range(INPUT_LAYER_SIZE).map(() => createInputNode()),
      _.range(HIDDEN_LAYER_SIZE).map(() => createRandomNode(INPUT_LAYER_SIZE)),
      _.range(OUTPUT_LAYER_SIZE).map(() => createRandomNode(HIDDEN_LAYER_SIZE)),
    ];
  }

  // takes an array of inputs, returns an array of outputs
  value(inputs) {
    let inputsToNextLayer = inputs;

    this.layers.forEach(layer => {
      inputsToNextLayer = layer.map((node, i) => node.value(inputsToNextLayer[i]));
    });
    return inputsToNextLayer;
  }
}

