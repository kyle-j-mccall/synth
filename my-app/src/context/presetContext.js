import React, { useContext, useState } from "react";
import { OscillatorNode } from "../Nodes/OscillatorNode";

export const PresetContext = React.createContext();

export const PresetProvider = ({ children }) => {
  const [preset, setPreset] = useState({
    masterVolume: 0.75,
    gainAttack: 1,
    gainDecay: 1,
    gainSustain: 1,
    gainRelease: 2,
    oscType: "sawtooth",
    filterFreq: 1000,
    filterType: "lowpass",
    filterQ: 0,
  });
  console.log(preset);

  return (
    <PresetContext.Provider value={{ preset, setPreset }}>
      {children}
    </PresetContext.Provider>
  );
};

export const usePreset = () => {
  const context = useContext(PresetContext);
  return context;
};
