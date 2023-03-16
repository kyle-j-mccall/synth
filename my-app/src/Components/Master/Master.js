import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./Master.css";
import { PresetContext } from "../../context/presetContext";

export default function MasterVolume() {
  const { preset, setPreset } = useContext(PresetContext);
  const { masterVolume } = preset;
  console.log(masterVolume);

  const handleSetMasterVol = (e) => {
    setPreset({
      ...preset,
      masterVolume: e.value / 10,
    });
  };

  return (
    <div className="volume-container">
      <p>Master Volume</p>
      <Knob
        className="volume-knob"
        value={masterVolume * 10}
        size={80}
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
