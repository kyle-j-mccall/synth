import React, { useState } from "react";
import "./SynthLayout.css";
import { Piano, KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout() {
  const [waveform, setWaveform] = useState("");
  const ctx = new AudioContext();
  let osc;

  MidiNumbers.midiToFrequency = function (midiNumber) {
    return 440 * Math.pow(2, (midiNumber - 69) / 12);
  };

  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("c4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  const playNote = (midiNumber) => {
    const frequency = MidiNumbers.midiToFrequency(midiNumber);
    osc = ctx.createOscillator(); // use the same oscillator instance
    osc.type = waveform; // You can change the oscillator type here
    osc.frequency.value = frequency;
    osc.connect(ctx.destination);
    osc.start();
  };

  const stopNote = (midiNumber) => {
    osc.stop(); // use the same oscillator instance
  };

  const startOsc = (midiNumber) => {
    osc = ctx.createOscillator();
    osc.type = waveform;
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2);
  };

  const stopOsc = (midiNumber) => {
    osc.stop();
  };

  return (
    <div className="layout-body">
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
      <div className="keyboard-container">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={playNote}
          stopNote={stopNote}
          width={700}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
}
