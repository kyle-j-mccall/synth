import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { Knob } from "primereact/knob";
import "./LFO.css";

export default function LFO() {
  return (
    <div className="lfo-container">
      <div className="wave-select-container">
        <InputLabel>Shape</InputLabel>
        <TextField
          select
          variant="standard"
          id="standard-basic"
          value={"lowpass"}
        >
          <MenuItem value={"lowpass"}>Sine</MenuItem>
          <MenuItem value={"highpass"}>Saw Down</MenuItem>
          <MenuItem value={"bandpass"}>Saw Up</MenuItem>
          <MenuItem value={"notch"}>Square</MenuItem>
        </TextField>
      </div>
      <div className="lfo-controls">
        <div className="speed-knob">
          <Knob
            value={0}
            size={100}
            min={20}
            max={20000}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Speed</p>
        </div>
        <div className="amount-knob">
          <Knob
            value={0}
            size={50}
            min={0}
            max={100}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>amount</p>
        </div>
      </div>
    </div>
  );
}
