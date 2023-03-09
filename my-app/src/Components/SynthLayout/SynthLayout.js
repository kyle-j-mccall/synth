import React, { useState } from "react";
import "./SynthLayout.css";
import { Piano, KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
import "./Keyboard.css";
import { AwesomeButton } from "react-awesome-button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "react-awesome-button/dist/styles.css";
const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout() {
  const [waveform, setWaveform] = useState("Waveform");
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
          {/* <InputLabel id="demo-simple-select-label">Waveform</InputLabel> */}
          <TextField
            style={{ width: "12vw" }}
            labelId="demo-simple-select-label"
            id="demo-multiple-waveform"
            value={waveform}
            label="Waveform"
            select
            // input={<OutlinedInput label="Waveform" />}
            onChange={(e) => setWaveform(e.target.value)}
          >
            <MenuItem value={"sine"}>Sine</MenuItem>
            <MenuItem value={"triangle"}>Triangle</MenuItem>
            <MenuItem value={"square"}>Square</MenuItem>
            <MenuItem value={"sawtooth"}>Saw</MenuItem>
          </TextField>
        </div>
        <div className="button-container">
          <AwesomeButton
            onMouseDown={() => startOsc()}
            onMouseUp={() => stopOsc()}
          >
            Play
          </AwesomeButton>
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
