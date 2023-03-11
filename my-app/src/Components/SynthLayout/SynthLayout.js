import React, { useState } from "react";
import "./SynthLayout.css";
import { Piano, KeyboardShortcuts } from "react-piano";
import "react-piano/dist/styles.css";
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
  const [osc1Semitone, setOsc1Semitone] = useState(0);
  const [osc2Semitone, setOsc2Semitone] = useState(0);
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(0);
  const [osc1Pitch, setOsc1Pitch] = useState(440);
  const [osc2Pitch, setOsc2Pitch] = useState(440);
  const [unisonWidth, setUnisonWidth] = useState(1);

  const ctx = new AudioContext();
  const semitoneRatio = Math.pow(2, 1 / 12);
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

  //setting up array of oscillators for detuning functionality
  const oscBank = new Array(2);

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

  const incrementOsc1 = () => {
    const newFrequency = osc1Pitch * semitoneRatio;
    setOsc1Pitch(newFrequency);
  };
  const decrementOsc1 = () => {
    const newFrequency = osc1Pitch / semitoneRatio;
    setOsc1Pitch(newFrequency);
  };
  const incrementOsc2 = () => {
    const newFrequency = osc1Pitch * semitoneRatio;
    setOsc1Pitch(newFrequency);
  };
  const decrementOsc2 = () => {
    const newFrequency = osc1Pitch / semitoneRatio;
    setOsc1Pitch(newFrequency);
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
          <div>Filter</div>
          <div>ADSR</div>
          <div>FX</div>
        </div>
        <div className="module-controls">
          <div className="osc-controls">
            <div className="osc-pitch-controls">
              <div className="osc1-pitch">
                <img
                  className="pitch-arrow"
                  src={upArrow}
                  alt="pitch-up"
                  onClick={() => {
                    setOsc1Semitone((prevState) => prevState + 1);
                  }}
                />
                <p className="semitones">{osc1Semitone}</p>
                <img
                  className="pitch-arrow"
                  src={downArrow}
                  alt="pitch-down"
                  onClick={() => {
                    setOsc1Semitone((prevState) => prevState - 1);
                  }}
                />
              </div>
              <div className="osc2-pitch">
                <img
                  className="pitch-arrow"
                  src={upArrow}
                  alt="pitch-up"
                  onClick={() => {
                    setOsc2Semitone((prevState) => prevState + 1);
                  }}
                />
                <p className="semitones">{osc2Semitone}</p>
                <img
                  className="pitch-arrow"
                  src={downArrow}
                  alt="pitch-down"
                  onClick={() => {
                    setOsc2Semitone((prevState) => prevState - 1);
                  }}
                />
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
          <div className="filter-container">filter</div>
          <div className="adsr-container">
            <div className="attack-container">
              <p>Attack</p>
              <Knob
                value={attack}
                size={60}
                min={0}
                max={50}
                onChange={(e) => setAttack(e.value)}
                strokeWidth={6}
                rangeColor="rgb(245, 110, 179)"
                valueColor="rgb(203, 228, 222)"
                textColor="white"
              />
            </div>
            <div className="decay-container">
              <p>Decay</p>
              <Knob
                value={decay}
                size={60}
                min={0}
                max={50}
                onChange={(e) => setDecay(e.value)}
                strokeWidth={6}
                rangeColor="rgb(245, 110, 179)"
                valueColor="rgb(203, 228, 222)"
                textColor="white"
              />
            </div>
            <div className="sustain-container">
              <p>Sustain</p>
              <Knob
                value={sustain}
                size={60}
                min={0}
                max={50}
                onChange={(e) => setSustain(e.value)}
                strokeWidth={6}
                rangeColor="rgb(245, 110, 179)"
                valueColor="rgb(203, 228, 222)"
                textColor="white"
              />
            </div>
            <div className="release-container">
              <p>Release</p>
              <Knob
                value={release}
                size={60}
                min={0}
                max={50}
                onChange={(e) => setRelease(e.value)}
                strokeWidth={6}
                rangeColor="rgb(245, 110, 179)"
                valueColor="rgb(203, 228, 222)"
                textColor="white"
              />
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
