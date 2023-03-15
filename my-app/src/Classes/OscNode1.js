import { Gain } from "./GainNode";

export class Oscillator {
  constructor(AC) {
    this.AC = AC;
    this.node = this.AC.createOscillator();
    this.WAVEFORMS = ["sine", "triangle", "square", "sawtooth"];
    this.maxFreq = 44100;

    this.gainNode = new Gain(this.AC);
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
      ? this.node.frequency.setTargetAtTime(freq, this.AC.currentTime, time)
      : this.node.frequency.setValueAtTime(freq, this.AC.currentTime);
  };
  setGain = (val) => this.gainNode.setGain(val);
}
