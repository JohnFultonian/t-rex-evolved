const sigmoid = num => 1/(1+Math.exp((-num) / 1));


const INPUT_LAYER_SIZE = 2;
//const HIDDEN_LAYER_SIZE = 2
const HIDDEN_LAYER_SIZES = [2]
const OUTPUT_LAYER_SIZE = 1;


// Represents a node in a neural network
// weights and biases are both arrays
// the size of the weight and bias arrays should be equal to the number of inputs coming into the node
class Node {
  constructor(weights, activationFunction = sigmoid) {
    this.weights = weights;
    this.activationFunction = activationFunction;
  }

  value(input) {
    let inputsArray = _.isArray(input) ? input : [input];
    return this.activationFunction(inputsArray.reduce((accumulator, value, index) => accumulator + this.weights[index]*input,0));
  }
}

class InputNode {
  constructor() {
    this.weights = [];
  }
  value(input) { return input; }
}

class BiasNode {
  constructor() {
    this.weights = [];
  }

  value(input) { return 1; }
}

const createInputNode = () => new Node([1], i => i);

const createRandomNode = (inputSize) => new Node(
    _.range(inputSize).map(() => _.random(-1, 1, true)),
);

// Represents a Neural Network
// Each layer is an array of nodes
// A Neural network is by default constructed using random nodes
class NeuralNetwork {
  constructor() {
    let inputLayer = [..._.times(INPUT_LAYER_SIZE, () => new InputNode()), new BiasNode()];
    let lastLayerSize = INPUT_LAYER_SIZE + 1;
    let hiddenLayers = HIDDEN_LAYER_SIZES.map((layerSize) => {
      return [..._.times(layerSize, () => createRandomNode(lastLayerSize)), new BiasNode()]
      lastLayerSize = layerSize + 1;
    });
    let outputLayer = _.times(OUTPUT_LAYER_SIZE, () => createRandomNode(lastLayerSize));

    this.layers = [
      inputLayer,
      ...hiddenLayers,
      outputLayer
    ]
    //this.layers = [
    //  [..._.range(INPUT_LAYER_SIZE).map(() => new InputNode()), new BiasNode()],
    //  [..._.range(HIDDEN_LAYER_SIZE).map(() => createRandomNode(INPUT_LAYER_SIZE)), new BiasNode()],
    //  _.range(OUTPUT_LAYER_SIZE).map(() => createRandomNode(HIDDEN_LAYER_SIZE)),
    //];
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

