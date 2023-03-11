export class OscNode {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.gainNode = audioContext.createGain();
    this.playing = false;
    this.oscNode = audioContext.createOscillator();
    this.state = {
      pitch: 440, // default pitch is A4 (440 Hz)
      waveform: "sine",
      gain: 0.5,
    };

    // connect the oscillator node to the gain node
    this.oscNode.connect(this.gainNode);

    // connect the gain node to the destination
    this.gainNode.connect(audioContext.destination);
  }

  isPlaying() {
    return this.playing;
  }

  start(freq) {
    if (!this.playing) {
      // check if the Oscillator is already playing
      this.oscNode = this.audioContext.createOscillator();
      this.oscNode.type = this.state.waveform;
      this.oscNode.frequency.value = freq;
      this.gainNode.gain.value = this.state.gain; // set the gain value
      this.oscNode.connect(this.audioContext.destination);
      this.oscNode.start();
      this.playing = true;
    }
  }

  stop() {
    if (this.playing) {
      // check if the Oscillator is currently playing
      this.oscNode.stop();
      this.playing = false;
    }
  }

  setGain(gain) {
    this.state.gain = gain;
    this.gainNode.gain.value = this.state.gain;
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
    this.state.waveform = waveform;
    this.oscNode.type = this.state.waveform;
  }

  setPitch(pitch) {
    this.state.pitch = pitch;
    this.oscNode.frequency.value = this.state.pitch;
  }
}
