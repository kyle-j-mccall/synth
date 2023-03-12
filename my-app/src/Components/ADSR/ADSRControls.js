import React, { useState } from "react";
import { Knob } from "primereact/knob";
import "./ADSR.css";

export default function ADSRControls() {
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(0);

  return (
    <div className="adsr-container">
      <div className="attack-container">
        <p>Attack</p>
        <Knob
          value={attack}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setAttack(e.value)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="decay-container">
        <Knob
          value={decay}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setDecay(e.value)}
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
          value={sustain}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setSustain(e.value)}
          strokeWidth={6}
          rangeColor="rgb(37, 109, 133)"
          valueColor="rgb(229, 209, 250)"
          textColor="white"
        />
      </div>
      <div className="release-container">
        <Knob
          value={release}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setRelease(e.value)}
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
