import "./App.css";
import SynthLayout1 from "./Components/SynthLayout/SynthLayout1";
import { OscillatorProvider } from "./context/oscillatorContext";

function App() {
  return (
    <div className="App">
      <OscillatorProvider>
        <SynthLayout1 className="synth-component" />
      </OscillatorProvider>
    </div>
  );
}

export default App;
