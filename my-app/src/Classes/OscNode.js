import { ADSRNode } from "./ADSRNode";
import { Filter } from "./FilterNode";

export class OscNode {
  oscNode;
  gainNode;
  pitch;
  waveform;
  isPlaying;
  filter;

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.gainNode = audioContext.createGain();
    this.gainNode.gain.value = 0.5; // default gain is 0.5
    this.oscNode = null;
    this.isPlaying = false;
    this.pitch = 440; // default pitch is A4 (440 Hz)
    this.waveform = "sine"; // default waveform is sine
    this.filter = new Filter(audioContext, "lowpass", 100, 1, 0);
  }

  getGainNode() {
    return this.gainNode;
  }

  setGain(volume) {
    // const gain = volume / 100;
    this.gainNode.gain.value = volume;
  }

  adjustGain(change) {
    const currentGain = this.gainNode.gain.value;
    const converted = change / 10;
    const newGain =
      converted > currentGain
        ? currentGain + change / 10
        : currentGain - Math.abs(change) / 10;
    this.setGain(newGain);
  }

  startOsc(freq, attack) {
    if (!this.isPlaying) {
      this.oscNode = this.audioContext.createOscillator();
      const adsr = new ADSRNode(this.audioContext, this.gainNode);
      adsr.setAttackTime(attack); // set the attack time

      this.oscNode.type = this.waveform;
      this.oscNode.frequency.value = freq;
      this.oscNode.connect(this.filter.filter); // connect oscillator to filter
      this.filter.connect(this.gainNode); // connect filter to gain node
      this.gainNode.connect(this.audioContext.destination); // connect gain node to destination

      adsr.trigger();
      this.oscNode.start();
      this.isPlaying = true;
    }
  }

  stopOsc() {
    if (this.isPlaying) {
      this.oscNode.stop();
      this.oscNode.disconnect();
      this.filter.disconnect();
      this.isPlaying = false;
    }
  }

  incrementPitch() {
    console.log("clicked");
    const semitoneRatio = Math.pow(2, 1 / 12); // ratio of one semitone
    this.pitch *= semitoneRatio;
  }

  decrementPitch() {
    const semitoneRatio = Math.pow(2, 1 / 12); // ratio of one semitone
    this.pitch /= semitoneRatio;
  }

  setWaveform(waveform) {
    this.waveform = waveform;
    if (this.isPlaying) {
      this.oscNode.type = waveform;
    }
  }

  setPitch(pitch) {
    this.pitch = pitch;
  }

  setFilterCutoff(frequency) {
    this.filter.setCutoff(frequency);
  }

  setFilterType(type) {
    this.filter.setType(type);
  }

  setFilterQ(Q) {
    this.filter.setQ(Q);
  }
}
