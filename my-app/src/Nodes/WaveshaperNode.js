import { Gain } from "./Gain";

const createDistCurve = (amount = 0) => {
  const k = amount;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  let x;

  for (let i = 0; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] =
      ((3 + k) * Math.atan(Math.sinh(x * 0.25) * 5)) /
      (Math.PI + k * Math.abs(x));
  }
  return curve;
};

export class WaveshaperNode {
  constructor(actx) {
    this.dryGain = new Gain(actx);
    this.wetGain = new Gain(actx);
    this.driveNode = actx.createWaveShaper();
    this.driveNode.curve = createDistCurve();

    this.dryGain.getNode().connect(this.driveNode);
    this.driveNode.connect(this.wetGain.getNode());
    this.distortion = 0;
    this.maxDistortion = 15;
  }

  connect(target) {
    this.dryGain.connect(target);
    this.wetGain.connect(target);
  }

  setDryWet(value) {
    this.dryGain.setGain(1 - value);
    this.wetGain.setGain(value);
  }

  setDist(value) {
    if (value < 0 || value > this.maxDistortion) return false;
    this.distortion = value;
    this.driveNode.curve = createDistCurve(value);
  }

  getDryNode() {
    return this.dryGain.getNode();
  }

  getWetNode() {
    return this.wetGain.getNode();
  }
}
