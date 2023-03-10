import React, { Component } from "react";

class OscillatorNodeExample extends Component {
  constructor(props) {
    super(props);
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.frequency.value = 440;
    this.oscillatorNode.start();
  }

  render() {
    return (
      <div>
        <h1>Web Audio API Example</h1>
        <p>
          Creating an instance of an oscillator node with frequency of 440Hz:
        </p>
      </div>
    );
  }
}

export default OscillatorNodeExample;
