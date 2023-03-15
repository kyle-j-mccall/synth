// export default function setPresetState() {
//   const presetState = {
//     mastVolume: 0.75,
//     vcoType: "sawtooth",
//     filterFreq: 3000,
//     filterType: "lowpass",
//     filterQ: 0,
//   };
//   return presetState;
// }

const presetState = {
  masterVolume: 0.75,
  oscType: "sawtooth",
  filterFreq: 1000,
  filterType: "lowpass",
  filterQ: 0,
};

module.exports = { presetState };
