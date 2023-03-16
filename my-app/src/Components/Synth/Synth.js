import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const actx = useMemo(() => new AudioContext(), []);
  const { preset } = useContext(PresetContext);
  // const { oscillator } = preset;
  const [currentOscillator, setCurrentOscillator] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // create nodes
  const gain = useMemo(() => new Gain(actx), [actx]);
  const volume = useMemo(() => new Gain(actx), [actx]);
  const filter = useMemo(() => new BiquadFilter(actx), [actx]);

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
  const syncState = useCallback(
    (oscillator) => {
      volume.setGain(preset.masterVolume);
      oscillator.setType(preset.oscType);
      filter.setFrequency(preset.filterFreq);
      filter.setType(preset.filterType);
      filter.setQ(preset.filterQ);
      gain.setGain(0); // Reset Volume
      gain.setGain(preset.masterVolume, preset.gainAttack);
      gain.setGain(
        preset.masterVolume * preset.gainSustain,
        preset.gainDecay,
        preset.gainAttack
      );
    },
    [preset, volume, filter, gain]
  );

  useEffect(() => {
    if (currentOscillator) {
      syncState(currentOscillator);
    }
  }, [preset, currentOscillator, syncState]);

  const stopnote = () => {
    if (currentOscillator) {
      gain.setGain(0, 0, preset.gainRelease);
      setTimeout(() => {
        setIsPlaying(false);
        currentOscillator.stop();
        setCurrentOscillator(null);
      }, preset.gainRelease * 1000);
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
