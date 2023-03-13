import React, { createContext, useContext, useState } from "react";
import { OscNode } from "../Classes/OscNode";

// Create the context
export const OscillatorContext = createContext();

// Create the provider
export const OscillatorProvider = ({ children }) => {
  // create global context to be passed to instances of nodes
  const audioContext = new AudioContext();

  // create global instances of nodes
  const [oscillator1, setOscillator1] = useState(new OscNode(audioContext));
  const [oscillator2, setOscillator2] = useState(new OscNode(audioContext));
  const [globalAttack, setGlobalAttack] = useState(500);
  const [globalDecay, setGlobalDecay] = useState(500);
  const [globalSustain, setGlobalSustain] = useState(1000);
  const [globalRelease, setGlobalRelease] = useState(1000);

  return (
    <OscillatorContext.Provider
      value={{
        oscillator1,
        setOscillator1,
        oscillator2,
        setOscillator2,
        globalAttack,
        setGlobalAttack,
        globalDecay,
        setGlobalDecay,
        globalSustain,
        setGlobalSustain,
        globalRelease,
        setGlobalRelease,
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
