import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./Waveshaper.css";
import { PresetContext } from "../../../context/presetContext";

export default function Waveshaper() {
  const { preset, setPreset } = useContext(PresetContext);
  const { driveAmount, driveDist } = preset;

  const handleSetDist = (e) => {
    setPreset({
      ...preset,
      driveDist: e.value,
    });
  };
  const handleSetDryWet = (e) => {
    setPreset({
      ...preset,
      driveAmount: e.value,
    });
  };
  return (
    <div className="waveshaper-container">
      <div className="waveshaper-title">
        <p>Drive</p>
      </div>
      <div className="waveshaper-controls">
        <div className="shape-container">
          <p>Shape</p>

          <Knob
            className="wave-shaper-knob"
            value={driveDist}
            size={70}
            min={0}
            max={50}
            strokeWidth={6}
            onChange={(e) => {
              handleSetDist(e);
            }}
            rangeColor="rgb(37, 109, 133)"
            valueColor="rgb(229, 209, 250)"
            textColor="white"
          />
        </div>
        <div className="amount-container">
          <p>Dry/Wet</p>

          <Knob
            className="wave-shaper-knob"
            value={driveAmount}
            size={70}
            min={0}
            max={50}
            strokeWidth={6}
            onChange={(e) => {
              handleSetDryWet(e);
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
