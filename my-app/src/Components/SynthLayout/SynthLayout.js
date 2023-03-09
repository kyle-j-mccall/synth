import React, { useState } from "react";
import "./SynthLayout.css";
import { Piano, KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
import "./Keyboard.css";
import { Knob } from "primereact/knob";
import "react-awesome-button/dist/styles.css";
import sineIcon from "../../assets/sine.png";
import sawIcon from "../../assets/saw.png";
import squareIcon from "../../assets/square.png";
import upArrow from "../../assets/arrow-up.png";
import downArrow from "../../assets/arrow-down.png";

const MidiNumbers = require("react-piano").MidiNumbers;

export default function SynthLayout() {
  const [osc1Waveform, setOsc1Waveform] = useState("");
  const [osc2Waveform, setOsc2Waveform] = useState("sine");
  const [osc1Gain, setOsc1Gain] = useState(0);
  const [osc2Gain, setOsc2Gain] = useState(0);
  const [osc1Pitch, setOsc1Pitch] = useState(440);
  const [osc2Pitch, setOsc2Pitch] = useState(440);
  const [unisonWidth, setUnisonWidth] = useState(1);
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

  // start for play button
  // const startOsc = () => {
  //   osc = ctx.createOscillator();
  //   osc.type = waveform;
  //   osc.connect(ctx.destination);
  //   osc.start();
  // };

  //stop for play button
  // const stopOsc = () => {
  //   osc.stop();
  // };

  //setting up array of oscillators for detuning functionality
  const oscBank = new Array(2);

  //function that detunes array of oscillators
  // const polyphonic = (freq) => {
  //   osc = ctx.createOscillator();
  //   osc.type = waveform;
  //   osc.frequency.value = freq;
  //   osc.detune.value = detune;
  //   osc.connect(ctx.destination);
  //   osc.start();
  //   return osc;
  // };

  const osc1 = (freq) => {
    osc = ctx.createOscillator();
    osc.type = osc1Waveform;
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    return osc;
  };
  const osc2 = (freq) => {
    osc = ctx.createOscillator();
    osc.type = osc2Waveform;
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    return osc;
  };

  //function for keyboard input
  const playNote = (midiNumber) => {
    const freq = MidiNumbers.midiToFrequency(midiNumber);
    //creating multiple instances of oscillators
    oscBank[0] = osc1(freq);
    oscBank[1] = osc2(freq);
  };

  //stop keyboard input
  const stopNote = () => {
    //stopping same instances of oscillators
    oscBank[0].stop();
    oscBank[1].stop();
  };

  return (
    <div className="layout-body">
      <div className="synth-container">
        <div className="module-titles">
          <div>Oscillators</div>
          <div>ADSR</div>
          <div>Output</div>
        </div>
        <div className="module-controls">
          <div className="osc-controls">
            <div className="osc-pitch-controls">
              <div className="osc1-pitch">
                <img className="pitch-arrow" src={upArrow} alt="pitch-up" />
                <p>0</p>
                <img className="pitch-arrow" src={downArrow} alt="pitch-down" />
              </div>
              <div className="osc2-pitch">
                <img className="pitch-arrow" src={upArrow} alt="pitch-up" />
                <p>0</p>
                <img className="pitch-arrow" src={downArrow} alt="pitch-down" />
              </div>
            </div>
            <div className="osc-container">
              <div className="osc1-cell">
                <div className="osc1 waves">
                  <img
                    className="wave-icon"
                    src={sineIcon}
                    alt="sine-icon"
                    onClick={() => setOsc1Waveform("sine")}
                  />
                  <img
                    className="wave-icon"
                    src={sawIcon}
                    alt="saw-icon"
                    onClick={() => setOsc1Waveform("sawtooth")}
                  />
                  <img
                    className="wave-icon"
                    src={squareIcon}
                    alt="square-icon"
                    onClick={() => setOsc1Waveform("square")}
                  />
                </div>
                <div className="osc1-freq-knob">
                  <Knob
                    value={osc1Gain}
                    size={80}
                    min={20}
                    max={50}
                    onChange={(e) => setOsc1Gain(e.value)}
                    strokeWidth={6}
                    rangeColor="rgb(37, 109, 133)"
                    valueColor="rgb(203, 228, 222)"
                    textColor="white"
                  />
                  <p>Gain</p>
                </div>
              </div>

              <div className="osc2-cell">
                <div className="osc2-waves">
                  <img
                    className="wave-icon"
                    src={sineIcon}
                    alt="sine-icon"
                    onClick={() => setOsc2Waveform("sine")}
                  />
                  <img
                    className="wave-icon"
                    src={sawIcon}
                    alt="saw-icon"
                    onClick={() => setOsc2Waveform("sawtooth")}
                  />
                  <img
                    className="wave-icon"
                    src={squareIcon}
                    alt="square-icon"
                    onClick={() => setOsc2Waveform("square")}
                  />
                </div>
                <div className="osc2-freq-knob">
                  <Knob
                    value={osc2Gain}
                    size={80}
                    min={20}
                    max={50}
                    onChange={(e) => setOsc2Gain(e.value)}
                    strokeWidth={6}
                    rangeColor="rgb(37, 109, 133)"
                    valueColor="rgb(203, 228, 222)"
                    textColor="white"
                  />
                  <p>Gain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="keyboard-container">
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={playNote}
          stopNote={stopNote}
          width={400}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    </div>
  );
}
