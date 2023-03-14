export class DelayNode {
  constructor(audioContext, delayTime, feedback, mix) {
    this.audioContext = audioContext;
    this.delayTime = delayTime;
    this.feedback = feedback;
    this.mix = mix;

    // create nodes
    this.input = this.audioContext.createGain();
    this.output = this.audioContext.createGain();
    this.delay = this.audioContext.createDelay();
    this.feedbackGain = this.audioContext.createGain();
    this.mixGain = this.audioContext.createGain();

    // connect nodes
    this.input.connect(this.delay);
    this.input.connect(this.output);
    this.delay.connect(this.feedbackGain);
    this.feedbackGain.connect(this.delay);
    this.delay.connect(this.mixGain);
    this.mixGain.connect(this.output);

    // set initial values
    this.delay.delayTime.value = this.delayTime;
    this.feedbackGain.gain.value = this.feedback;
    this.mixGain.gain.value = this.mix;
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }

  setDelayTime(value) {
    this.delay.delayTime.value = value;
  }

  setFeedback(value) {
    this.feedbackGain.gain.value = value;
  }

  setMix(value) {
    this.mixGain.gain.value = value;
  }
}
