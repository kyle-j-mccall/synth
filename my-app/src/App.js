import "./App.css";
import Synth from "./Components/Synth/Synth";
import { PresetProvider } from "./context/presetContext";

function App() {
  return (
    <div className="App">
      <PresetProvider>
        <Synth className="synth-component" />
      </PresetProvider>
    </div>
  );
}

export default App;
