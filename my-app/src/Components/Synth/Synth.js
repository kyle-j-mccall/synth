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
    updateGain();
    setCurrentOscillator(newOscillator);
  };

  const syncState = useCallback(
    (oscillator) => {
      volume.setGain(preset.masterVolume);
      oscillator.setType(preset.oscType);
      filter.setFrequency(preset.filterFreq);
      filter.setType(preset.filterType);
      filter.setQ(preset.filterQ);
    },
    [preset, volume, filter]
  );

  const updateGain = useCallback(() => {
    const attackEndTime = actx.currentTime + preset.gainAttack;
    const decayEndTime = attackEndTime + preset.gainDecay;

    gain.setGain(0); // Reset Volume
    gain
      .getNode()
      .gain.linearRampToValueAtTime(preset.masterVolume, attackEndTime);
    gain
      .getNode()
      .gain.linearRampToValueAtTime(
        preset.masterVolume * preset.gainSustain,
        decayEndTime
      );
  }, [preset, gain, actx]);

  useEffect(() => {
    if (currentOscillator) {
      syncState(currentOscillator);
    }
  }, [preset, currentOscillator, syncState]);

  const stopnote = () => {
    if (currentOscillator) {
      const releaseEndTime = actx.currentTime + preset.gainRelease;
      gain
        .getNode()
        .gain.setValueAtTime(gain.getNode().gain.value, actx.currentTime);
      gain.getNode().gain.linearRampToValueAtTime(0, releaseEndTime);
      setTimeout(() => {
        setIsPlaying(false);
        currentOscillator.stop();
        gain.disconnect(); // Add this line to disconnect the gain node
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
