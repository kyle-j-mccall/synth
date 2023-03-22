import React, { useContext, useState } from "react";
import upArrow from "../../assets/arrow-up.png";
import downArrow from "../../assets/arrow-down.png";
import { Knob } from "primereact/knob";
import sineIcon from "../../assets/sine.png";
import sawIcon from "../../assets/saw.png";
import squareIcon from "../../assets/square.png";
import "./Osc1.css";
import { PresetContext } from "../../context/presetContext";

const Oscillator = () => {
  const { preset, setPreset } = useContext(PresetContext);
  const { oscGain, oscDetune } = preset;

  console.log(oscGain);

  const handleSetWaveform = (wave) => {
    setPreset({
      ...preset,
      oscType: wave,
    });
  };
  const handleSetDetune = (e) => {
    setPreset({
      ...preset,
      oscDetune: e.value,
    });
  };

  const handleSetGain = (e) => {
    setPreset({
      ...preset,
      oscGain: e.value / 10,
    });
  };

  return (
    <div className="osc-component1">
      <div className="osc-label">Oscillator</div>
      <div className="osc-waves">
        <img
          className="wave-icon"
          src={sineIcon}
          alt="sine-icon"
          onClick={() => handleSetWaveform("sine")}
        />
        <img
          className="wave-icon"
          src={sawIcon}
          alt="saw-icon"
          onClick={() => handleSetWaveform("sawtooth")}
        />
        <img
          className="wave-icon"
          src={squareIcon}
          alt="square-icon"
          onClick={() => handleSetWaveform("square")}
        />
      </div>
      <div className="oscillator-controls">
        <div className="detune container">
          <Knob
            value={oscDetune}
            size={80}
            min={-1500}
            max={1500}
            step={10}
            strokeWidth={5}
            onChange={(e) => handleSetDetune(e)}
            className="my-knob"
            rangeColor="rgb(37, 109, 133)"
            valueColor="rgb(229, 209, 250)"
            textColor="white"
          />
          <p className="detune-label">Detune</p>
        </div>
        <div className="gain-container">
          <Knob
            value={oscGain * 10}
            size={80}
            min={0}
            max={10}
            step={1}
            strokeWidth={5}
            onChange={(e) => handleSetGain(e)}
            className="my-knob"
            rangeColor="rgb(37, 109, 133)"
            valueColor="rgb(229, 209, 250)"
            textColor="white"
          />
          <p className="gain-label">Gain</p>
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
