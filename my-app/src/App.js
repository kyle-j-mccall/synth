import "./App.css";
import Keyboard from "./Components/Keyboard/Keyboard";
import SynthLayout from "./Components/SynthLayout/SynthLayout";

function App() {
  return (
    <div className="App">
      <div className="synth-component-container">
        <SynthLayout />
      </div>
      <div className="keyboard-component-container">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
