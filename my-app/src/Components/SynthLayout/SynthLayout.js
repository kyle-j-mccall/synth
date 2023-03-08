import React, { useState } from "react";
import "./SynthLayout.css";

export default function SynthLayout() {
  const [waveform, setWaveform] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const ctx = new AudioContext();

  const osc = ctx.createOscillator();

  osc.connect(ctx.destination);

  const startOsc = () => {
    osc.type = "sine";
    osc.start();
    setTimeout(() => {
      osc.stop();
    }, 1000);
  };

  return (
    <div className="synth-container">
      <select>
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
