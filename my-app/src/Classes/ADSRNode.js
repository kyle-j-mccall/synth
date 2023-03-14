export class ADSRNode {
  audioContext;
  gainNode;
  attackTime;
  decayTime;
  sustainLevel;
  releaseTime;

  constructor(audioContext, gainNode) {
    this.audioContext = audioContext;
    this.gainNode = gainNode;
    this.attackTime = 0.3;
    this.decayTime = 0.5;
    this.sustainLevel = 0.5;
    this.releaseTime = 0.5;
  }

  trigger() {
    const now = this.audioContext.currentTime;
    const gain = this.gainNode.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(0, now);
    gain.linearRampToValueAtTime(1, now + this.attackTime);
    gain.exponentialRampToValueAtTime(
      this.sustainLevel,
      now + this.attackTime + this.decayTime
    );
  }

  release(release) {
    const now = this.audioContext.currentTime;
    const gain = this.gainNode.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.exponentialRampToValueAtTime(0.01, now + this.releaseTime);
    gain.exponentialRampToValueAtTime(0.01, now + release);
  }

  setAttackTime(attackTime) {
    this.attackTime = attackTime;
  }

  setDecayTime(decayTime) {
    this.decayTime = decayTime;
  }

  setSustainLevel(sustainLevel) {
    this.sustainLevel = sustainLevel;
  }

  setReleaseTime(releaseTime) {
    this.releaseTime = releaseTime;
  }
}
