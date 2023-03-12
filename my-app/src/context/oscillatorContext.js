import React, { createContext, useContext, useState } from "react";
import { ADSRNode } from "../Classes/ADSRNode";
import { OscNode } from "../Classes/OscNode";

// Create the context
export const OscillatorContext = createContext();

// Create the provider
export const OscillatorProvider = ({ children }) => {
  const audioContext = new AudioContext();
  const [oscillator1, setOscillator1] = useState(new OscNode(audioContext));
  const [oscillator2, setOscillator2] = useState(new OscNode(audioContext));
  const [waveform1, setWaveform1] = useState(oscillator1.state.waveform);
  const [waveform2, setWaveform2] = useState(oscillator2.state.waveform);

  console.log(oscillator1, oscillator2);

  return (
    <OscillatorContext.Provider
      value={{
        oscillator1,
        setOscillator1,
        oscillator2,
        setOscillator2,
        waveform1,
        setWaveform1,
        waveform2,
        setWaveform2,
      }}
    >
      {children}
    </OscillatorContext.Provider>
  );
};

// Custom hook to use the context
export const useOscillator = () => {
  const context = useContext(OscillatorContext);

  if (!context) {
    throw new Error("useOscillator must be used within an OscillatorProvider");
  }

  return context;
};
