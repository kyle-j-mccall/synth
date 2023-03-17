import React, { useContext, useState } from "react";

export const PresetContext = React.createContext();

export const PresetProvider = ({ children }) => {
  const [preset, setPreset] = useState({
    masterVolume: 0.75,
    gainAttack: 0.1,
    gainDecay: 0.2,
    gainSustain: 0.3,
    gainRelease: 0.4,
    oscType: "sawtooth",
    filterFreq: 3000,
    filterType: "lowpass",
    filterQ: 0,
    lfoRate: 0,
    lfoDepth: 0,
    lfoType: "sine",
    delayTime: 0.7,
    delayFeedback: 0.7,
    delayWet: 0.7,
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
