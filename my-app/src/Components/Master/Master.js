import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./Master.css";
import { PresetContext } from "../../context/presetContext";

export default function MasterVolume() {
  const { preset, setPreset } = useContext(PresetContext);
  const { masterVolume } = preset;

  const handleSetMasterVol = (e) => {
    setPreset({
      ...preset,
      masterVolume: e.value / 10,
    });
  };

  return (
    <div className="volume-container">
      <p className="master-title">
        Master <br></br>Volume
      </p>
      <Knob
        className="volume-knob"
        value={masterVolume * 10}
        size={100}
        min={0}
        max={10}
        step={0.5}
        strokeWidth={6}
        onChange={(e) => handleSetMasterVol(e)}
        rangeColor="rgb(37, 109, 133)"
        valueColor="rgb(229, 209, 250)"
        textColor="white"
      />
    </div>
  );
}
