import React from "react";
import { Piano } from "react-piano";
import "react-piano/dist/styles.css";
import "./Keyboard.css";

// const MidiNumbers = require("react-piano").MidiNumbers;

export default function Keyboard({
  playNote,
  stopNote,
  firstNote,
  lastNote,
  keyboardShortcuts,
}) {
  // MidiNumbers.midiToFrequency = function (midiNumber) {
  //   return 440 * Math.pow(2, (midiNumber - 69) / 12);
  // };

  // MidiNumbers.midiToFrequency = function (midiNumber) {
  //   return 440 * Math.pow(2, (midiNumber - 69) / 12);
  // };

  return (
    <div className="keyboard-container">
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={400}
        keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  );
}
