import React, { useContext, useState } from "react";
import "./SynthLayout.css";
import "react-piano/dist/styles.css";
import "react-awesome-button/dist/styles.css";
import Oscillator from "../Osc/Oscillator";
import Keyboard from "../Keyboard/Keyboard";
import { KeyboardShortcuts } from "react-piano";
import FilterControls from "../Filter/Filter";
import FX from "../FX/FX";
import ADSRControls from "../ADSR/ADSRControls";
import { OscillatorContext } from "../../context/oscillatorContext";
import Oscillator2 from "../Osc/Oscillator2";

const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout1() {
  const {
    oscillator1,
    oscillator2,
    globalAttack,
    globalDecay,
    globalSustain,
    globalRelease,
  } = useContext(OscillatorContext);

  // convert adsr values from milliseconds to seconds
  let attackInSecs = globalAttack / 1000;
  let decayInSecs = globalDecay / 1000;
  let sustainInSecs = globalSustain / 1000;
  let releaseInSecs = globalRelease / 1000;
  console.log(releaseInSecs);

  MidiNumbers.midiToFrequency = function (midiNumber) {
    return 440 * Math.pow(2, (midiNumber - 69) / 12);
  };

  MidiNumbers.frequencyToMidi = function (frequency) {
    return 69 + 12 * Math.log2(frequency / 440);
  };

  // create first and last note to determine note range for react-piano
  const firstNote = oscillator1.pitch
    ? MidiNumbers.frequencyToMidi(oscillator1.pitch)
    : MidiNumbers.frequencyToMidi(440);
  const lastNote = oscillator1.pitch
    ? MidiNumbers.frequencyToMidi(oscillator1.pitch * 2)
    : MidiNumbers.frequencyToMidi(880);
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  //play function for keyboard input
  const playNote = (midiNumber) => {
    // set key values to correspond with pitches of the two oscillators
    const freq = MidiNumbers.frequencyToMidi(oscillator1.pitch);
    const freq2 = MidiNumbers.frequencyToMidi(oscillator2.pitch);

    // check if oscillators are playing
    // pass adsr values to startOsc method
    if (!oscillator1.isPlaying) {
      oscillator1.startOsc(freq, attackInSecs, decayInSecs, sustainInSecs);
    }

    if (!oscillator2.isPlaying) {
      oscillator2.startOsc(freq2, attackInSecs, decayInSecs, sustainInSecs);
    }
  };

  //stop keyboard input
  const stopNote = () => {
    oscillator1.stopOsc(releaseInSecs);

    oscillator2.stopOsc(releaseInSecs);
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
            <Oscillator />
            <Oscillator2 />
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
