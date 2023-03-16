import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./ADSR.css";
import { PresetContext } from "../../context/presetContext";

export default function ADSRControls() {
  const { preset, setPreset } = useContext(PresetContext);
  const { gainAttack, gainDecay, gainSustain, gainRelease } = preset;

  const handleSetAttack = (e) => {
    setPreset({
      ...preset,
      gainAttack: e.value,
    });
  };
  const handleSetDecay = (e) => {
    setPreset({
      ...preset,
      gainDecay: e.value,
    });
  };
  const handleSetSustain = (e) => {
    setPreset({
      ...preset,
      gainSustain: e.value,
    });
  };
  const handleSetRelease = (e) => {
    setPreset({
      ...preset,
      gainRelease: e.value,
    });
  };

  return (
    <div className="adsr-container">
      <div className="attack-container">
        <p>Attack</p>
        <Knob
          value={gainAttack}
          size={60}
          min={1}
          max={6}
          step={1}
          onChange={(e) => handleSetAttack(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="decay-container">
        <Knob
          value={gainDecay}
          size={60}
          min={1}
          max={6}
          onChange={(e) => handleSetDecay(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
        <p>Decay</p>
      </div>
      <div className="sustain-container">
        <p>Sustain</p>
        <Knob
          value={gainSustain}
          size={60}
          min={1}
          max={6}
          onChange={(e) => handleSetSustain(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="release-container">
        <Knob
          value={gainRelease}
          size={60}
          min={1}
          max={6}
          onChange={(e) => handleSetRelease(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
        <p>Release</p>
      </div>
    </div>
  );
}
