export class Gain {
  constructor(actx) {
    this.actx = actx;
    this.node = this.actx.createGain();
  }

  connect = (destination) => this.node.connect(destination);

  // Getters
  getNode = () => this.node;
  getGain = () => this.node.gain.value;

  // Setters
  setGain = (val, time = 0) => {
    time
      ? this.node.gain.setTargetAtTime(val, this.actx.currentTime, time)
      : this.node.gain.setValueAtTime(val, this.actx.currentTime);
  };
}
