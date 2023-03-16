import React, { useContext, useState } from "react";

export const PresetContext = React.createContext();

export const PresetProvider = ({ children }) => {
  const [preset, setPreset] = useState({
    masterVolume: 0.75,
    gainAttack: 4,
    gainDecay: 0,
    gainSustain: 1,
    gainRelease: 0,
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
