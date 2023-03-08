import React, { useState } from "react";
import "./SynthLayout.css";

export default function SynthLayout() {
  const [waveform, setWaveform] = useState("");
  // const [isPlaying, setIsPlaying] = useState(false);
  const ctx = new AudioContext();

  const osc = ctx.createOscillator();

  osc.connect(ctx.destination);
  osc.type = waveform;
  const startOsc = () => {
    osc.start();
    setTimeout(() => {
      osc.stop();
    }, 1000);
  };

  return (
    <div className="synth-container">
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

      <button
        onClick={() => {
          startOsc();
        }}
      ></button>
    </div>
  );
}
