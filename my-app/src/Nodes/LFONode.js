export class LFONode {
  constructor(audioContext) {
    this.context = audioContext; // Store a reference to the audio context
    this.lfoNode = this.context.createOscillator(); // Create an oscillator node for the LFO
    this.depthNode = this.context.createGain(); // Create a gain node to control the depth of the LFO
    this.maxRate = 100;
    this.maxDepth = 1000;
  }

  start() {
    this.lfoNode.start(); // Start the LFO oscillator
  }

  stop() {
    this.lfoNode.stop(); // Stop the LFO oscillator
  }

  connect(targetNode) {
    this.lfoNode.connect(this.depthNode); // Connect the LFO oscillator to the depth (gain) node
    this.depthNode.connect(targetNode); // Connect the depth (gain) node to the target node (e.g., filter frequency)
  }

  isConnected() {
    return this.connected;
  }

  getNode = () => this.node;

  disconnect() {
    this.lfoNode.disconnect(); // Disconnect the LFO oscillator from the depth (gain) node
    this.depthNode.disconnect(); // Disconnect the depth (gain) node from the target node
  }

  setRate(freq) {
    // Set the frequency of the LFO oscillator at the current time
    this.lfoNode.frequency.setValueAtTime(freq, this.context.currentTime);
  }

  setDepth(depth) {
    // Set the depth (amplitude) of the LFO modulation at the current time
    this.depthNode.gain.setValueAtTime(depth, this.context.currentTime);
  }

  setType(type) {
    this.lfoNode.type = type; // Set the waveform type of the LFO oscillator (sine, square, sawtooth, or triangle)
  }
}
