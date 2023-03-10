export class Oscillator {
  constructor(audioContext, frequency) {
    this.audioContext = audioContext;
    this.frequency = frequency;
    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.frequency.value = this.frequency;
  }

  start() {
    this.oscillatorNode.start();
  }

  stop() {
    this.oscillatorNode.stop();
  }

  setFrequency(frequency) {
    this.frequency = frequency;
    this.oscillatorNode.frequency.value = this.frequency;
  }

  connect(destinationNode) {
    this.oscillatorNode.connect(destinationNode);
  }
}
