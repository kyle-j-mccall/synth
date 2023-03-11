export class OscNode {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.oscNode = audioContext.createOscillator();
    this.state = {
      pitch: 440, // default pitch is A4 (440 Hz)
      waveform: "sine", // default waveform is sine
    };
  }

  start(freq) {
    this.oscNode.type = this.state.waveform;
    this.oscNode.frequency.value = this.state.pitch;
    this.oscNode.connect(this.audioContext.destination);
    this.oscNode.start();
  }

  stop() {
    this.oscNode.stop();
  }

  incrementPitch() {
    const semitoneRatio = Math.pow(2, 1 / 12); // ratio of one semitone
    this.state.pitch *= semitoneRatio;
    this.oscNode.frequency.value = this.state.pitch;
  }

  decrementPitch() {
    const semitoneRatio = Math.pow(2, 1 / 12); // ratio of one semitone
    this.state.pitch /= semitoneRatio;
    this.oscNode.frequency.value = this.state.pitch;
  }

  setWaveform(waveform) {
    this.oscNode.type = waveform;
  }

  setPitch(pitch) {
    this.state.pitch = pitch;
    this.oscNode.frequency.value = this.state.pitch;
  }
}
