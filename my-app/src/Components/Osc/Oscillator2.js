import React, { useContext, useState } from "react";
import upArrow from "../../assets/arrow-up.png";
import downArrow from "../../assets/arrow-down.png";
import { Knob } from "primereact/knob";
import sineIcon from "../../assets/sine.png";
import sawIcon from "../../assets/saw.png";
import squareIcon from "../../assets/square.png";
import "./Osc2.css";
import { OscillatorContext } from "../../context/oscillatorContext";
// import "primereact/resources/themes/fluent-light/theme.css";

const Oscillator2 = ({}) => {
  const { oscillator2 } = useContext(OscillatorContext);
  const [semitoneNum, setSemitoneNum] = useState(0);
  const [volume, setVolume] = useState(0);

  console.log("osc2", oscillator2);

  const handleIncrement = () => {
    console.log("click");
    oscillator2.incrementPitch();
  };

  const handleDecrement = () => {
    oscillator2.decrementPitch();
  };

  const handleSetWaveform = (wave) => {
    console.log(wave);
    oscillator2.setWaveform(wave);
  };

  const handleSetGain = (value) => {
    setVolume(value);
    oscillator2.adjustGain(value);
  };

  return (
    <div className="osc-component2">
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
          <div className="osc-freq-knob">
            <Knob
              value={volume}
              size={80}
              min={0}
              max={10}
              step={1}
              // style={{ backgroundColor: "var(--highlight-bg)" }}
              strokeWidth={5}
              onChange={(e) => handleSetGain(e.value)}
              className="my-knob"
              rangeColor="rgb(37, 109, 133)"
              valueColor="rgb(229, 209, 250)"
              textColor="white"
            />
            <p>Gain</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oscillator2;
