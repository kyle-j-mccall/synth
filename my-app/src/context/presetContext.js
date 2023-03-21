import React, { useContext, useState } from "react";

export const PresetContext = React.createContext();

export const PresetProvider = ({ children }) => {
  const [preset, setPreset] = useState({
    masterVolume: 0.75,
    oscGain: 0.75,
    gainAttack: 0.1,
    gainDecay: 0.2,
    gainSustain: 0.3,
    gainRelease: 0.4,
    oscType: "sawtooth",
    filterFreq: 5000,
    filterType: "lowpass",
    filterQ: 0,
    lfoRate: 0,
    lfoDepth: 0,
    lfoType: "sine",
    delayTime: 0,
    delayFeedback: 0,
    delayWet: 0,
    driveAmount: 0,
    driveDist: 0,
  });

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
