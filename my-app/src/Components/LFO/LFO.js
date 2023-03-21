import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { Knob } from "primereact/knob";
import "./LFO.css";
import { PresetContext } from "../../context/presetContext";

export default function LFO() {
  const { preset, setPreset } = useContext(PresetContext);
  const { lfoRate, lfoType, lfoDepth } = preset;

  const handleSetRate = (e) => {
    setPreset({
      ...preset,
      lfoRate: e.value,
    });
  };
  const handleSetType = (e) => {
    setPreset({
      ...preset,
      lfoType: e.target.value,
    });
  };
  const handleSetDepth = (e) => {
    setPreset({
      ...preset,
      lfoDepth: e.value,
    });
  };

  return (
    <div className="lfo-container">
      <div className="wave-select-container">
        <InputLabel>Shape</InputLabel>
        <TextField
          select
          variant="standard"
          id="standard-basic"
          value={lfoType}
          style={{ width: "10vw" }}
          onChange={(e) => {
            handleSetType(e);
          }}
        >
          <MenuItem value={"sine"}>Sine</MenuItem>
          <MenuItem value={"sawtooth"}>Saw</MenuItem>
          <MenuItem value={"square"}>Square</MenuItem>
        </TextField>
      </div>
      <div className="lfo-controls">
        <div className="rate-knob">
          <Knob
            value={lfoRate}
            size={100}
            min={0}
            max={25}
            strokeWidth={6}
            onChange={(e) => {
              handleSetRate(e);
            }}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Rate</p>
        </div>
        <div className="depth-knob">
          <Knob
            value={lfoDepth}
            size={70}
            min={0}
            max={1000}
            strokeWidth={6}
            onChange={(e) => {
              handleSetDepth(e);
            }}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Depth</p>
        </div>
      </div>
    </div>
  );
}
