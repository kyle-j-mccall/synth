import React, { useEffect, useState } from "react";
import "./SynthLayout.css";
import "react-piano/dist/styles.css";
import "react-awesome-button/dist/styles.css";
import Oscillator from "../Osc/Oscillator";
import ADSR from "../ADSR/ADSR";
import Keyboard from "../Keyboard/Keyboard";
import { OscNode } from "../../Classes/OscNode";
import { KeyboardShortcuts } from "react-piano";

const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout1() {
  const [oscillator1, setOscillator1] = useState(null);
  const [oscillator2, setOscillator2] = useState(null);
  const [osc1Pitch, setOsc1Pitch] = useState(MidiNumbers.fromNote["c3"]);
  const [osc2Pitch, setOsc2Pitch] = useState(MidiNumbers.fromNote["c3"]);

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

  const audioContext = new AudioContext();

  let newOsc1;
  let newOsc2;

  //function for keyboard input
  const playNote = (midiNumber) => {
    const freq = MidiNumbers.midiToFrequency(midiNumber);
    newOsc1 = new OscNode(audioContext);
    newOsc1.setPitch(freq);
    newOsc2 = new OscNode(audioContext);
    newOsc2.setPitch(freq);

    newOsc1.start(freq);
    newOsc2.start(freq);
  };

  //stop keyboard input
  const stopNote = () => {
    //stopping same instances of oscillators
    newOsc1.stop();
    newOsc2.stop();
  };

  return (
    <div className="layout-body">
      <div className="synth-container">
        <div className="module-titles">
          <div>Oscillators</div>
          <div>Filter</div>
          <div>ADSR</div>
          <div>FX</div>
        </div>
        <div className="module-controls">
          <div className="oscillators">
            <Oscillator oscillator={oscillator1} />
            <Oscillator oscillator={oscillator2} />
          </div>
          <div className="filter-container">filter</div>
          <div className="adsr-container">
            <ADSR />
          </div>
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
