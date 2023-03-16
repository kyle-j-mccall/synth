import { Gain } from "./Gain";

export class OscillatorNode {
  constructor(actx) {
    this.actx = actx;
    this.node = this.actx.createOscillator();
    this.WAVEFORMS = ["sine", "triangle", "square", "sawtooth"];

    this.maxFreq = 44100;

    this.gainNode = new Gain(this.actx);
    this.node.connect(this.gainNode.getNode());
  }

  connect = (destination) => this.gainNode.connect(destination);
  start = () => this.node.start();

  // Getters
  getNode = () => this.node;

  // Setters
  setType = (type) => {
    if (!this.WAVEFORMS.includes(type)) return false;
    this.node.type = type;
  };
  setFreq = (freq, time = 0) => {
    if (freq < 0 || freq > this.maxFreq) return false;
    time
      ? this.node.frequency.setTargetAtTime(freq, this.actx.currentTime, time)
      : this.node.frequency.setValueAtTime(freq, this.actx.currentTime);
  };
  setGain = (val) => this.gainNode.setGain(val);

  stop() {
    this.node.stop();
  }
}
