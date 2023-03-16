import React from "react";
import { Knob } from "primereact/knob";
import "./FX.css";

export default function FX() {
  return (
    <div className="fx-container">
      <div className="delay-container">
        <p>Delay</p>
        <Knob
          className="delay-knob"
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
      <div className="reverb-container">
        <p>Reverb</p>
        <Knob
          className="reverb-knob"
          value={10}
          size={60}
          min={0}
          max={50}
          strokeWidth={6}
          rangeColor="rgb(0, 171, 179)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
    </div>
  );
}
