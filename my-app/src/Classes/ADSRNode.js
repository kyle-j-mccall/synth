export class ADSRNode {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.attackTime = 3;
    this.decayTime = 0.2;
    this.sustainLevel = 0.5;
    this.releaseTime = 0.5;

    this.gainNode = this.audioContext.createGain(); // Add a gainNode
    this.attackNode = this.audioContext.createGain();
    this.decayNode = this.audioContext.createGain();
    this.sustainNode = this.audioContext.createGain();
    this.releaseNode = this.audioContext.createGain();

    this.attackNode.gain.value = 0;
    this.decayNode.gain.value = 1;
    this.sustainNode.gain.value = this.sustainLevel;
    this.releaseNode.gain.value = this.sustainNode.gain.value;

    this.attackNode.connect(this.decayNode);
    this.decayNode.connect(this.sustainNode);
    this.sustainNode.connect(this.releaseNode);
    this.releaseNode.connect(this.gainNode); // Connect releaseNode to gainNode

    this.currentTime = this.audioContext.currentTime;
    this.startTime = 0;
    this.releaseStartTime = 0;
    this.releaseStartValue = 0;
  }

  trigger() {
    const now = this.audioContext.currentTime;
    const gain = this.gainNode.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(0, now);
    gain.linearRampToValueAtTime(1, now + this.attackTime); // set attack time to 5 seconds
    gain.setTargetAtTime(
      this.sustainLevel,
      now + this.attackTime,
      this.decayTime + 0.001
    );
  }

  connect(node) {
    this.gainNode.connect(node); // Connect gainNode to output node
  }
}
