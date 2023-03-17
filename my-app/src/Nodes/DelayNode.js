import { Gain } from "./Gain";

class DelayNode {
  constructor(actx) {
    this.actx = actx;
    this.delayNode = actx.createDelay();
    this.inputGain = new Gain(actx);
    this.feedbackGain = new Gain(actx);
    this.dryGain = new Gain(actx);
    this.wetGain = new Gain(actx);

    this.delayNode.connect(this.feedbackGain.getNode());
    this.feedbackGain.connect(this.wetGain.getNode());
    this.feedbackGain.connect(this.delayNode);
    this.inputGain.connect(this.dryGain.getNode()); // Add this line
    this.inputGain.connect(this.delayNode); // Add this line

    this.maxDelayTime = 1;
  }

  getDelayNode() {
    return this.delayNode;
  }

  // connect(target) {
  //   this.dryGain.connect(target);
  //   this.wetGain.connect(target);
  //   console.log("target", target);
  //   console.log("connectdry", this.dryGain.getGain());
  //   console.log("connectwet", this.wetGain.getGain());
  // }
  connect(target) {
    this.inputGain.connect(target); // Change this line
  }
  disconnect() {
    this.inputGain.disconnect(); // Change this line
  }

  // disconnect() {
  //   this.dryGain.disconnect();
  //   this.wetGain.disconnect();
  // }

  setDryWet(value) {
    this.dryGain.setGain(1 - value);
    this.wetGain.setGain(value);
    console.log("value", value);
    console.log("dryGain", this.dryGain.getGain());
    console.log("wet", this.wetGain.getGain());
  }

  getDryNode() {
    return this.dryGain.getNode();
  }

  getWetNode() {
    return this.wetGain.getNode();
  }

  setDelayTime = (val) => {
    if (val < 0 || val > this.maxDelayTime) return false;
    this.delayNode.delayTime.setValueAtTime(val, this.actx.currentTime);
  };

  setFeedback(value) {
    this.feedbackGain.setGain(value);
  }

  getDelayTimeParam() {
    return this.delayNode.delayTime;
  }
}

export { DelayNode };
