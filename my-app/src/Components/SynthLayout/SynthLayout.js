import React, { useState } from "react";
import "./SynthLayout.css";

export default function SynthLayout() {
  const [waveform, setWaveform] = useState("");
  // const [isPlaying, setIsPlaying] = useState(false);

  const ctx = new AudioContext();

  let osc;

  const startOsc = () => {
    osc = ctx.createOscillator();
    osc.type = waveform;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2);
  };

  const stopOsc = () => {
    osc.stop();
  };

  return (
    <div className="synth-container">
      <div className="select-container">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setWaveform(e.target.value)}
        >
          <option value="DEFAULT">Select a waveform</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Saw</option>
          <option value="sine">Sine</option>
        </select>
      </div>
      <div className="button-container">
        <button onMouseDown={() => startOsc()} onMouseUp={() => stopOsc()}>
          Play
        </button>
      </div>
    </div>
  );
}
