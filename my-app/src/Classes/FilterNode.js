export class Filter {
  constructor(context, type = "lowpass", frequency = 440, Q = 1, gain = 0) {
    this.context = context;
    this.filter = context.createBiquadFilter();
    this.filter.type = type;
    this.filter.frequency.setValueAtTime(frequency, context.currentTime);
    this.filter.Q.setValueAtTime(Q, context.currentTime);
    this.filter.gain.setValueAtTime(gain, context.currentTime);
  }

  setType(type) {
    this.filter.type = type;
  }

  setCutoff(frequency) {
    this.filter.frequency.setValueAtTime(frequency, this.context.currentTime);
  }

  setQ(Q) {
    this.filter.Q.setValueAtTime(Q, this.context.currentTime);
  }

  setGain(gain) {
    this.filter.gain.setValueAtTime(gain, this.context.currentTime);
  }

  connect(input) {
    this.filter.connect(input);
  }

  disconnect() {
    this.filter.disconnect();
  }
}
