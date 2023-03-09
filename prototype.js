//saved components

// detuner slider
<Box className="detune-container">
  <InputLabel id="detune-oscillator-label">Detune</InputLabel>
  <Slider
    style={{ width: "12vw" }}
    labeid="detune-oscillator-label"
    defaultValue={1}
    aria-label="Default"
    valueLabelDisplay="auto"
    step={1}
    max={50}
    onChange={(e) => setUnisonWidth(e.target.value)}
  />
</Box>;

//play button
<div className="button-container">
  <AwesomeButton onMouseDown={() => startOsc()} onMouseUp={() => stopOsc()}>
    Play
  </AwesomeButton>
</div>;

//waveform select
<Box className="select-container">
  <TextField
    style={{ width: "12vw" }}
    id="demo-multiple-waveform"
    value={waveform}
    label="Waveform"
    select
    onChange={(e) => setWaveform(e.target.value)}
  >
    <MenuItem value={"sine"}>Sine</MenuItem>
    <MenuItem value={"triangle"}>Triangle</MenuItem>
    <MenuItem value={"square"}>Square</MenuItem>
    <MenuItem value={"sawtooth"}>Saw</MenuItem>
  </TextField>
</Box>;
