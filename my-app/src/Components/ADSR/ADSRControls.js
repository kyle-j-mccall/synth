import React, { useContext, useState } from "react";
import { Knob } from "primereact/knob";
import "./ADSR.css";
import { OscillatorContext } from "../../context/oscillatorContext";
import { ADSRNode } from "../../Classes/ADSRNode";

export default function ADSRControls() {
  const {
    globalAttack,
    setGlobalAttack,
    globalDecay,
    setGlobalDecay,
    globalSustain,
    setGlobalSustain,
    globalRelease,
    setGlobalRelease,
  } = useContext(OscillatorContext);

  const handleSetAttack = (e) => {
    setGlobalAttack(e.value);
  };
  const handleSetDecay = (e) => {
    setGlobalDecay(e.value);
  };
  const handleSetSustain = (e) => {
    setGlobalSustain(e.value);
  };
  const handleSetRelease = (e) => {
    setGlobalRelease(e.value);
  };

  return (
    <div className="adsr-container">
      <div className="attack-container">
        <p>Attack</p>
        <Knob
          value={globalAttack}
          size={60}
          min={50}
          max={5000}
          step={10}
          onChange={(e) => handleSetAttack(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="decay-container">
        <Knob
          value={globalDecay}
          size={60}
          min={50}
          max={5000}
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
          value={globalSustain}
          size={60}
          min={0}
          max={50}
          onChange={(e) => handleSetSustain(e)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="release-container">
        <Knob
          value={globalRelease}
          size={60}
          min={50}
          max={6000}
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
