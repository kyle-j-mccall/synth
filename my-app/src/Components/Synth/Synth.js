import React from "react";
import "./Synth.css";
import "react-piano/dist/styles.css";
import "react-awesome-button/dist/styles.css";
import Oscillator from "../Osc/Oscillator";
import Keyboard from "../Keyboard/Keyboard";
import { KeyboardShortcuts } from "react-piano";
import FilterControls from "../Filter/Filter";
import FX from "../FX/FX";
import ADSRControls from "../ADSR/ADSRControls";
import Oscillator2 from "../Osc/Oscillator2";
import { Gain } from "../../Nodes/Gain";
import { Button } from "@mui/material";
import { OscillatorNode } from "../../Nodes/OscillatorNode";
import { Filter } from "../../Classes/FilterNode";
import { BiquadFilter } from "../../Nodes/Filter";
const preset = require("./presets").presetState;

export default function Synth() {
  const actx = new AudioContext();
  console.log(preset);
  // create nodes
  const oscillator = new OscillatorNode(actx);
  const gain = new Gain(actx);
  const volume = new Gain(actx);
  const filter = new BiquadFilter(actx);

  // connect nodes

  const initSynth = () => {
    syncState();
    volume.connect(actx.destination);
    gain.connect(volume.getNode());
    filter.connect(gain.getNode());
    oscillator.connect(filter.getNode());
    oscillator.start();
  };
  const stopnote = () => {
    oscillator.stop();
  };

  // sync nodes to preset state
  const syncState = () => {
    volume.setGain(preset.masterVolume);
    oscillator.setType(preset.oscType);
    filter.setFrequency(preset.filterFreq);
    filter.setType(preset.filterType);
    filter.setQ(preset.filterQ);
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
      <Button
        onMouseDown={() => {
          initSynth();
        }}
        onMouseUp={() => {
          stopnote();
        }}
      >
        Play
      </Button>
    </div>
  );
}
