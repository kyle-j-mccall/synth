import React, { useContext, useState } from "react";
import { Knob } from "primereact/knob";
import "./Filter.css";
import { OscillatorContext } from "../../context/oscillatorContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function FilterControls() {
  const [filterType, setFilterType] = useState("lowpass");
  const { oscillator1, oscillator2 } = useContext(OscillatorContext);

  const handleSetType = (e) => {
    setFilterType(e.target.value);
    oscillator1.filter.setType(filterType);
    oscillator2.filter.setType(filterType);
  };

  return (
    <div className="filter-container">
      <div className="cutoff-container">
        <TextField
          select
          variant="standard"
          id="standard-basic"
          label="Filter Type"
          onChange={(e) => handleSetType(e.target.value)}
        >
          <MenuItem value={"lowpass"}>Lowpass</MenuItem>
          <MenuItem value={"highpass"}>Highpass</MenuItem>
          <MenuItem value={"bandpass"}>Bandpass</MenuItem>
          <MenuItem value={"notch"}>Notch</MenuItem>
        </TextField>
        <div className="cutoff-knob">
          <Knob
            value={5}
            size={100}
            min={0}
            max={50}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Cutoff</p>
        </div>
      </div>
      <div className="res-container">
        <div className="res-knob">
          <Knob
            value={5}
            size={50}
            min={0}
            max={50}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
          />
          <p>Resonance</p>
        </div>
      </div>
    </div>
  );
}
