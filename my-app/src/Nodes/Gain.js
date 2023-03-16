export class Gain {
  constructor(actx) {
    this.actx = actx;
    this.node = this.actx.createGain();
  }

  connect = (destination) => this.node.connect(destination);

  // Getters
  getNode = () => this.node;
  getGain = () => this.node.gain.value;

  setGain = (val, time = 0, duration) => {
    if (duration) {
      this.node.gain.setValueAtTime(
        this.getGain(),
        this.actx.currentTime + time
      );
      this.node.gain.linearRampToValueAtTime(
        val,
        this.actx.currentTime + time + duration
      );
    } else {
      time
        ? this.node.gain.setTargetAtTime(val, this.actx.currentTime, time)
        : this.node.gain.setValueAtTime(val, this.actx.currentTime);
    }
  };
}
