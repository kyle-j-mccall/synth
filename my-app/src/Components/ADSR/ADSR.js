import React, { useState } from "react";
import { Knob } from "primereact/knob";

export default function ADSR() {
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
          rangeColor="rgb(245, 110, 179)"
          valueColor="rgb(203, 228, 222)"
          textColor="white"
        />
      </div>
      <div className="decay-container">
        <p>Decay</p>
        <Knob
          value={decay}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setDecay(e.value)}
          strokeWidth={6}
          rangeColor="rgb(245, 110, 179)"
          valueColor="rgb(203, 228, 222)"
          textColor="white"
        />
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
          rangeColor="rgb(245, 110, 179)"
          valueColor="rgb(203, 228, 222)"
          textColor="white"
        />
      </div>
      <div className="release-container">
        <p>Release</p>
        <Knob
          value={release}
          size={60}
          min={0}
          max={50}
          onChange={(e) => setRelease(e.value)}
          strokeWidth={6}
          rangeColor="rgb(245, 110, 179)"
          valueColor="rgb(203, 228, 222)"
          textColor="white"
        />
      </div>
    </div>
  );
}
