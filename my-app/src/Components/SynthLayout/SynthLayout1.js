import React, { useContext, useEffect, useMemo, useState } from "react";
import "./SynthLayout.css";
import "react-piano/dist/styles.css";
import "react-awesome-button/dist/styles.css";
import Oscillator from "../Osc/Oscillator";
import Keyboard from "../Keyboard/Keyboard";
import { OscNode } from "../../Classes/OscNode";
import { KeyboardShortcuts } from "react-piano";
import FilterControls from "../Filter/Filter";
import FX from "../FX/FX";
import { ADSRNode } from "../../Classes/ADSRNode";
import ADSRControls from "../ADSR/ADSRControls";
import { OscillatorContext } from "../../context/oscillatorContext";

const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout1() {
  const { oscillator1, setOscillator1, oscillator2, setOscillator2 } =
    useContext(OscillatorContext);

  console.log(oscillator1, oscillator2);

  MidiNumbers.midiToFrequency = function (midiNumber) {
    return 440 * Math.pow(2, (midiNumber - 69) / 12);
  };

  MidiNumbers.frequencyToMidi = function (frequency) {
    return 69 + 12 * Math.log2(frequency / 440);
  };

  const firstNote = oscillator1.state.pitch
    ? MidiNumbers.frequencyToMidi(oscillator1.state.pitch)
    : MidiNumbers.frequencyToMidi(440);
  const lastNote = oscillator1.state.pitch
    ? MidiNumbers.frequencyToMidi(oscillator1.state.pitch * 2)
    : MidiNumbers.frequencyToMidi(880);
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  //function for keyboard input
  const playNote = (midiNumber) => {
    const freq = MidiNumbers.frequencyToMidi(oscillator1.state.pitch);

    if (!oscillator1.isPlaying()) {
      oscillator1.start(freq);
    }

    if (!oscillator2.isPlaying()) {
      oscillator2.start(freq);
    }
  };

  //stop keyboard input
  const stopNote = () => {
    oscillator1.stop();
    oscillator2.stop();
  };

  const handleSetWaveform1 = (wave) => {
    const waveform = wave;
    oscillator1.setWaveform(waveform);
  };
  const handleSetWaveform2 = (wave) => {
    const waveform = wave;
    oscillator2.setWaveform(waveform);
  };

  return (
    <div className="layout-body">
      <div className="synth-container">
        <div className="module-titles">
          <div>Oscillators</div>
          <div>Filter</div>
          <div>ADSR</div>
          <div className="fx-title">FX</div>
        </div>
        <div className="module-controls">
          <div className="oscillators">
            <Oscillator
              oscillator={oscillator1}
              handleSetWaveform={handleSetWaveform1}
            />
            <Oscillator
              oscillator={oscillator2}
              handleSetWaveform={handleSetWaveform2}
            />
          </div>

          <FilterControls />
          <ADSRControls />
          <FX />
        </div>
      </div>
      <Keyboard
        playNote={playNote}
        stopNote={stopNote}
        keyboardShortcuts={keyboardShortcuts}
        firstNote={firstNote}
        lastNote={lastNote}
      />
    </div>
  );
}
