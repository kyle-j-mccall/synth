import React from "react";
import { Knob } from "primereact/knob";
import "./Master.css";

export default function MasterVolume() {
  return (
    <div className="volume-container">
      <p>Master Volume</p>
      <Knob
        className="volume-knob"
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
  );
}
