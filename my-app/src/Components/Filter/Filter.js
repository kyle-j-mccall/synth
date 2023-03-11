import React from "react";
import { Knob } from "primereact/knob";
import "./Filter.css";

export default function FilterControls() {
  return (
    <div className="filter-container">
      <div className="cutoff-container">
        <div className="cutoff-knob">
          <Knob
            value={5}
            size={100}
            min={0}
            max={50}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Cutoff</p>
        </div>
      </div>
      <div className="res-container">
        <div className="res-knob">
          <Knob
            value={5}
            size={50}
            min={0}
            max={50}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Resonance</p>
        </div>
      </div>
    </div>
  );
}
