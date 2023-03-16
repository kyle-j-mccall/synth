import React, { useContext, useState } from "react";
import "./Synth.css";
import "react-piano/dist/styles.css";
import "react-awesome-button/dist/styles.css";
import Oscillator from "../Osc/Oscillator";
import FilterControls from "../Filter/Filter";
import FX from "../FX/FX";
import ADSRControls from "../ADSR/ADSRControls";
import { Gain } from "../../Nodes/Gain";
import { Button } from "@mui/material";
import { OscillatorNode } from "../../Nodes/OscillatorNode";
import { BiquadFilter } from "../../Nodes/Filter";
import { PresetContext } from "../../context/presetContext";

export default function Synth() {
  const actx = new AudioContext();
  const { preset } = useContext(PresetContext);
  const [currentOscillator, setCurrentOscillator] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // create nodes
  const gain = new Gain(actx);
  const volume = new Gain(actx);
  const filter = new BiquadFilter(actx);

  // connect nodes

  const initSynth = () => {
    if (currentOscillator) {
      currentOscillator.stop();
    }
    const newOscillator = new OscillatorNode(actx);

    volume.connect(actx.destination);
    gain.connect(volume.getNode());
    filter.connect(gain.getNode());
    newOscillator.connect(filter.getNode());

    newOscillator.start();

    syncState(newOscillator);
    setCurrentOscillator(newOscillator);
  };

  // sync nodes to preset state
  const syncState = (oscillator) => {
    volume.setGain(preset.masterVolume);
    oscillator.setType(preset.oscType);
    filter.setFrequency(preset.filterFreq);
    filter.setType(preset.filterType);
    filter.setQ(preset.filterQ);
    if (preset.gainAttack) {
      gain.setGain(0); // Reset Volume
      gain.setGain(preset.masterVolume, preset.gainAttack);
    } else {
      gain.setGain(preset.masterVolume);
    }
  };

  const stopnote = () => {
    if (currentOscillator) {
      setIsPlaying(false);
      currentOscillator.stop();
      setCurrentOscillator(null);
    }
  };

  const keydown = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      initSynth();
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
            {/* <Oscillator2 /> */}
          </div>

          <FilterControls />
          <ADSRControls />
          <FX />
        </div>
      </div>
      <div>
        <Button
          onMouseDown={() => {
            keydown();
          }}
          onMouseUp={() => {
            stopnote();
          }}
        >
          Play
        </Button>
      </div>
    </div>
  );
}
