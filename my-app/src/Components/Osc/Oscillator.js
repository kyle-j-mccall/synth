import React, { useState } from "react";
import upArrow from "../../assets/arrow-up.png";
import downArrow from "../../assets/arrow-down.png";
import { Knob } from "primereact/knob";
import sineIcon from "../../assets/sine.png";
import sawIcon from "../../assets/saw.png";
import squareIcon from "../../assets/square.png";
import "./Osc.css";

const Oscillator = ({ oscillator }) => {
  const [semitoneNum, setSemitoneNum] = useState(0);

  const handleIncrement = () => {
    oscillator.incrementPitch();
  };

  const handleDecrement = () => {
    oscillator.decrementPitch();
  };

  const handleSetWaveform = (wave) => {
    const waveform = wave;
    oscillator.setWaveform(waveform);
  };

  return (
    <div className="osc-component">
      <div className="pitch-controls">
        <div className="osc-pitch">
          <img
            className="pitch-arrow"
            src={upArrow}
            alt="pitch-up"
            onClick={() => {
              handleIncrement();
              setSemitoneNum((prevState) => prevState + 1);
            }}
          />
          <p className="semitones">{semitoneNum}</p>
          <img
            className="pitch-arrow"
            src={downArrow}
            alt="pitch-down"
            onClick={() => {
              handleDecrement();
              setSemitoneNum((prevState) => prevState - 1);
            }}
          />
        </div>
      </div>
      <div className="osc-container">
        <div className="osc-cell">
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
          <div className="osc1-freq-knob">
            <Knob
              value={5}
              size={80}
              min={20}
              max={50}
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
  );
};

export default Oscillator;
