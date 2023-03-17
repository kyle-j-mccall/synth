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
import ADSRControls from "../ADSR/ADSRControls";
import { Gain } from "../../Nodes/Gain";
import { Button } from "@mui/material";
import { OscillatorNode } from "../../Nodes/OscillatorNode";
import { BiquadFilter } from "../../Nodes/Filter";
import { PresetContext } from "../../context/presetContext";
import MasterVolume from "../Master/Master";
import LFO from "../LFO/LFO";
import { LFONode } from "../../Nodes/LFONode";
import Reverb from "../FX/Reverb/Reverb";
import { DelayNode } from "../../Nodes/DelayNode";
import Delay from "../FX/Delay/Delay";

export default function Synth() {
  const actx = useMemo(() => new AudioContext(), []);
  const { preset } = useContext(PresetContext);
  const [currentOscillator, setCurrentOscillator] = useState(null);
  const [lfo, setLFO] = useState(() => new LFONode(actx));
  const [isPlaying, setIsPlaying] = useState(false);
  const [stopTimeoutId, setStopTimeoutId] = useState(null);

  // create nodes
  const gain = useMemo(() => new Gain(actx), [actx]);
  const volume = useMemo(() => new Gain(actx), [actx]);
  const filter = useMemo(() => new BiquadFilter(actx), [actx]);
  const delay = useMemo(() => new DelayNode(actx), [actx]);

  // Function to initialize the synth, set up connections, and start the oscillator
  const initSynth = () => {
    // If there's an existing oscillator, stop it
    if (currentOscillator) {
      currentOscillator.stop();
    }

    // Create a new OscillatorNode
    const newOscillator = new OscillatorNode(actx);

    if (lfo.isConnected()) {
      lfo.disconnect();
    }
    syncState(newOscillator);

    delay.setDryWet(preset.delayWet);

    const newLFO = new LFONode(actx);

    // Set up connections between nodes in the audio graph
    volume.connect(actx.destination);
    gain.connect(volume.getNode());
    delay.getDryNode().connect(gain.getNode());
    delay.getWetNode().connect(gain.getNode());

    filter.connect(delay.getDelayNode());
    newLFO.connect(filter.getNode().frequency);
    newOscillator.connect(filter.getNode());

    // Start the new oscillator
    newOscillator.start();
    newLFO.start();

    // Sync the state of the new oscillator with the current preset values
    // Update the gain values based on the preset's ADSR settings
    updateGain();
    // Update the state with the new oscillator
    setCurrentOscillator(newOscillator);
    setLFO(newLFO);
  };

  const syncState = useCallback(
    (oscillator) => {
      volume.setGain(preset.masterVolume);
      oscillator.setType(preset.oscType);
      filter.setFrequency(preset.filterFreq);
      filter.setType(preset.filterType);
      filter.setQ(preset.filterQ);
      lfo.setType(preset.lfoType);
      lfo.setRate(preset.lfoRate);
      lfo.setDepth(preset.lfoDepth);
      delay.setFeedback(preset.delayFeedback);
      delay.setDelayTime(preset.delayTime);
      delay.setDryWet(preset.delayWet);
    },
    [preset, volume, filter, lfo, delay]
  );

  // Function to update the gain based on the preset's ADSR settings
  const updateGain = useCallback(() => {
    // Calculate the end times for the attack and decay phases
    const attackEndTime = actx.currentTime + preset.gainAttack;
    const decayEndTime = attackEndTime + preset.gainDecay;

    gain.setGain(0); // Reset Volume
    // Ramp up the gain to the master volume during the attack phase
    gain
      .getNode()
      .gain.linearRampToValueAtTime(preset.masterVolume, attackEndTime);
    // Ramp down the gain to the sustain level during the decay phase
    gain
      .getNode()
      .gain.linearRampToValueAtTime(
        preset.masterVolume * preset.gainSustain,
        decayEndTime
      );
  }, [preset, gain, actx]);

  // Sync the state of the current oscillator whenever the preset or oscillator changes
  useEffect(() => {
    if (currentOscillator) {
      syncState(currentOscillator);
    }
  }, [preset, currentOscillator, syncState]);

  // Function to stop the currently playing note
  const stopnote = () => {
    if (currentOscillator) {
      // Calculate the end time for the release phase
      const releaseEndTime = actx.currentTime + preset.gainRelease;
      // Set the gain value at the current time
      gain
        .getNode()
        .gain.setValueAtTime(gain.getNode().gain.value, actx.currentTime);
      // Ramp down the gain to 0 during the release phase
      gain.getNode().gain.linearRampToValueAtTime(0, releaseEndTime);
      // Stop the LFO and the oscillator after the release phase ends
      const timeoutId = setTimeout(() => {
        setIsPlaying(false);
        lfo.stop(); // Stop the LFO before stopping the oscillator
        currentOscillator.stop();
        lfo.disconnect();
        gain.disconnect(); // Add this line to disconnect the gain node
        setCurrentOscillator(null);
      }, preset.gainRelease * 1000);
      setStopTimeoutId(timeoutId); // Save the timeout id
    }
  };

  const keydown = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      initSynth();
    }
  };

  const keyUp = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (stopTimeoutId !== null) {
        clearTimeout(stopTimeoutId); // Cancel the scheduled stopnote function
      }
      stopnote();
    }
  };

  return (
    <div className="layout-body">
      <div className="synth-container">
        <div className="module-titles">
          <div>LL 419 Mini</div>
        </div>
        <div className="module-controls">
          <div className="left-column">
            <Oscillator />
            <FilterControls />
          </div>
          <div className="left1-column">
            <ADSRControls />
          </div>
          <div className="right-half">
            <div className="right-top">
              <LFO />
              <MasterVolume />
            </div>
            <div className="right-bottom">
              <Delay />
              <Reverb />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          onMouseDown={() => {
            keydown();
          }}
          onMouseUp={() => {
            keyUp();
          }}
        >
          Play
        </Button>
      </div>
    </div>
  );
}
