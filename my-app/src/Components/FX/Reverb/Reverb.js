import React from "react";
import { Knob } from "primereact/knob";
import "./Reverb.css";

export default function Reverb() {
  return (
    <div className="reverb-container">
      <div className="reverb-title">
        <p>Reverb</p>
      </div>
      <div className="reverb-controls">
        <Knob
          className="reverb-knob"
          value={10}
          size={80}
          min={0}
          max={50}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
    </div>
  );
}
