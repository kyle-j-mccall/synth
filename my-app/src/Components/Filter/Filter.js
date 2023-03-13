import React, { useContext, useState } from "react";
import { Knob } from "primereact/knob";
import "./Filter.css";
import { OscillatorContext } from "../../context/oscillatorContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

export default function FilterControls() {
  const [filterType, setFilterType] = useState("lowpass");
  const [cutoff, setCutoff] = useState(5000);
  const [filterQ, setFilterQ] = useState(20);
  const { oscillator1, oscillator2 } = useContext(OscillatorContext);

  // handler functions for setting filter values
  const handleSetType = (e) => {
    setFilterType(e.target.value);
    oscillator1.filter.setType(filterType);
    oscillator2.filter.setType(filterType);
  };

  const handleSetCutoff = (e) => {
    setCutoff(e.value);
    oscillator1.filter.setCutoff(e.value);
    oscillator2.filter.setCutoff(e.value);
  };

  const handleSetFilterRes = (e) => {
    setFilterQ(e.value);
    oscillator1.filter.setCutoff(e.value);
    oscillator2.filter.setCutoff(e.value);
  };

  return (
    <div className="filter-container">
      <div className="cutoff-container">
        <InputLabel>Filter Type</InputLabel>
        <TextField
          select
          variant="standard"
          id="standard-basic"
          value={filterType}
          onChange={(e) => handleSetType(e.target.value)}
        >
          <MenuItem value={"lowpass"}>Lowpass</MenuItem>
          <MenuItem value={"highpass"}>Highpass</MenuItem>
          <MenuItem value={"bandpass"}>Bandpass</MenuItem>
          <MenuItem value={"notch"}>Notch</MenuItem>
        </TextField>
        <div className="cutoff-knob">
          <Knob
            value={cutoff}
            size={100}
            min={20}
            max={20000}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
            onChange={(e) => handleSetCutoff(e)}
          />
          <p>Cutoff</p>
        </div>
      </div>
      <div className="res-container">
        <div className="res-knob">
          <Knob
            value={filterQ}
            size={50}
            min={0}
            max={100}
            strokeWidth={6}
            rangeColor="rgb(245, 110, 179)"
            valueColor="rgb(203, 228, 222)"
            textColor="white"
            onChange={(e) => handleSetFilterRes(e)}
          />
          <p>Q</p>
        </div>
      </div>
    </div>
  );
}
