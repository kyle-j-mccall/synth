import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./Delay.css";
import { PresetContext } from "../../../context/presetContext";

export default function Delay() {
  const { preset, setPreset } = useContext(PresetContext);
  const { delayTime, delayFeedback, delayWet } = preset;

  const handleSetTime = (e) => {
    setPreset({
      ...preset,
      delayTime: e.value / 1000,
    });
  };
  const handleSetFeedback = (e) => {
    setPreset({
      ...preset,
      delayFeedback: e.value / 1000,
    });
  };
  const handleSetWet = (e) => {
    setPreset({
      ...preset,
      delayWet: e.value / 1000,
    });
  };

  return (
    <div className="delay-container">
      <div className="delay-title">
        <p>Delay</p>
      </div>
      <div className="delay-controls">
        <div className="top">
          <div className="time-container">
            <p>Time</p>
            <Knob
              className="time-knob"
              value={delayTime * 1000}
              size={60}
              min={0}
              max={1000}
              step={10}
              strokeWidth={6}
              onChange={(e) => {
                handleSetTime(e);
              }}
              rangeColor="rgb(37, 109, 133)"
              valueColor="rgb(229, 209, 250)"
              textColor="white"
            />
          </div>

          <div className="feedback-container">
            <p>Feedback</p>
            <Knob
              className="feedback-knob"
              value={delayFeedback * 1000}
              size={60}
              min={0}
              max={1000}
              step={10}
              strokeWidth={6}
              onChange={(e) => {
                handleSetFeedback(e);
              }}
              rangeColor="rgb(37, 109, 133)"
              valueColor="rgb(229, 209, 250)"
              textColor="white"
            />
          </div>
        </div>

        <div className="dw-container">
          <p>Dry/Wet</p>
          <Knob
            className="dw-knob"
            value={delayWet * 1000}
            size={60}
            step={10}
            min={0}
            max={1000}
            strokeWidth={6}
            onChange={(e) => {
              handleSetWet(e);
            }}
            rangeColor="rgb(37, 109, 133)"
            valueColor="rgb(229, 209, 250)"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
