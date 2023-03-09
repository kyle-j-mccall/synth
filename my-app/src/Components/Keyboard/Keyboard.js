import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";

import "react-piano/dist/styles.css";

import React from "react";

export default function Keyboard() {
  const firstNote = MidiNumbers.fromNote("c3");
  const lastNote = MidiNumbers.fromNote("c4");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <div className="keyboard-container">
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={700}
        keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  );
}
