import React from "react";
import { Knob } from "primereact/knob";
import "./Delay.css";

export default function Delay() {
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
              value={10}
              size={60}
              min={0}
              max={50}
              strokeWidth={6}
              rangeColor="rgb(37, 109, 133)"
              valueColor="rgb(229, 209, 250)"
              textColor="white"
            />
          </div>

          <div className="feedback-container">
            <p>Feedback</p>
            <Knob
              className="feedback-knob"
              value={10}
              size={60}
              min={0}
              max={50}
              strokeWidth={6}
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
            value={10}
            size={60}
            min={0}
            max={50}
            strokeWidth={6}
            rangeColor="rgb(37, 109, 133)"
            valueColor="rgb(229, 209, 250)"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
