import React, { useEffect, useMemo, useState } from "react";
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
  const audioContext = new AudioContext();
  // const [oscillators, setOscillators] = useState([]);
  const [oscillator1, setOscillator1] = useState(new OscNode(audioContext));
  const [oscillator2, setOscillator2] = useState(new OscNode(audioContext));
  const [waveform, setWaveform] = useState("sine"); // default waveform is "sine"

  // const [oscillator1, setOscillator1] = useState(null);
  // const [oscillator2, setOscillator2] = useState(null);

  console.log(oscillator1, oscillator2);

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

  // useEffect(() => {
  //   const newOscillator1 = new OscNode(audioContext);
  //   const newOscillator2 = new OscNode(audioContext);
  //   setOscillator1(newOscillator1);
  //   setOscillator2(newOscillator2);
  //   return () => {
  //     newOscillator1.stop();
  //     newOscillator2.stop();
  //   };
  // }, [audioContext]);

  //function for keyboard input
  const playNote = (midiNumber) => {
    const freq = MidiNumbers.midiToFrequency(midiNumber);
    // const [oscillator1, oscillator2] = oscillators;

    oscillator1.setPitch(freq);
    oscillator2.setPitch(freq);

    oscillator1.setWaveform(waveform);
    oscillator2.setWaveform(waveform);

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
            <Oscillator oscillator={oscillator1} waveform={waveform} />
            <Oscillator oscillator={oscillator2} waveform={waveform} />
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
