import React, { useContext } from "react";
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
  const { oscillator1, oscillator2 } = useContext(OscillatorContext);

  MidiNumbers.midiToFrequency = function (midiNumber) {
    return 440 * Math.pow(2, (midiNumber - 69) / 12);
  };

  MidiNumbers.frequencyToMidi = function (frequency) {
    return 69 + 12 * Math.log2(frequency / 440);
  };

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

  //function for keyboard input
  const playNote = (midiNumber) => {
    const freq = MidiNumbers.frequencyToMidi(oscillator1.pitch);
    const freq2 = MidiNumbers.frequencyToMidi(oscillator2.pitch);

    if (!oscillator1.isPlaying) {
      console.log("gain111", oscillator1.gainNode);
      oscillator1.startOsc(freq);
    }

    if (!oscillator2.isPlaying) {
      console.log("gain222", oscillator2.gainNode);

      oscillator2.startOsc(freq2);
    }
  };

  //stop keyboard input
  const stopNote = () => {
    console.log(oscillator1.isPlaying);
    if (oscillator1.isPlaying) {
      oscillator1.stopOsc();
    }
    if (oscillator2.isPlaying) {
      oscillator2.stopOsc();
    }
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
