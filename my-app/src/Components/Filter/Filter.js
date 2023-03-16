import React, { useContext } from "react";
import { Knob } from "primereact/knob";
import "./Filter.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { PresetContext } from "../../context/presetContext";

export default function FilterControls() {
  const { preset, setPreset } = useContext(PresetContext);
  const { filterFreq, filterQ, filterType } = preset;

  const handleSetType = (e) => {
    setPreset({
      ...preset,
      filterType: e.target.value,
    });
  };

  const handleSetCutoff = (e) => {
    setPreset({
      ...preset,
      filterFreq: e.value,
    });
  };

  const handleSetFilterQ = (e) => {
    setPreset({
      ...preset,
      filterQ: e.value,
    });
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
          onChange={(e) => handleSetType(e)}
        >
          <MenuItem value={"lowpass"}>Lowpass</MenuItem>
          <MenuItem value={"highpass"}>Highpass</MenuItem>
          <MenuItem value={"bandpass"}>Bandpass</MenuItem>
          <MenuItem value={"notch"}>Notch</MenuItem>
        </TextField>
        <div className="cutoff-knob">
          <Knob
            value={filterFreq}
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
            onChange={(e) => handleSetFilterQ(e)}
          />
          <p>Q</p>
        </div>
      </div>
    </div>
  );
}
