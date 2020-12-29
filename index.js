let context = new AudioContext();

class Sound {
  constructor(context) {
    this.context = context;
    this.pitch = 440;
    this.volume = 0.5;
  }

  init() {
    // creatie oscillator and gain nodes
    this.oscillator = context.createOscillator();
    this.gainNode = context.createGain();
    this.pad = document.querySelector('.pad');
    // connect oscillator to gain
    this.oscillator.connect(this.gainNode);
    // connect to the destination
    this.gainNode.connect(this.context.destination);
    // set oscillator type and frequency - these are the defaults
    // this.oscillator.type = 'sine';
    this.oscillator.frequency.value = this.pitch;
    this.gainNode.gain.value = this.volume;
  }

  play() {
    this.init();
    this.oscillator.start(this.context.currentTime);
  }

  stop() {
    if (this.oscillator) {
      this.gainNode.gain.linearRampToValueAtTime(0.001, this.context.currentTime + 0.1);
      this.oscillator.stop(this.context.currentTime + 0.2);
      this.oscillator.frequency.setValueAtTime(0, 0.2);
    }
  }

  setPitch(val) {
    if (this.oscillator && this.oscillator.frequency.value !== 0) {
      this.oscillator.frequency.setValueAtTime(val, this.context.currentTime);
    } else this.pitch = val;
  }

  setVolume(val) {
    if (this.gainNode && this.oscillator.frequency.value !== 0) {
      this.gainNode.gain.setValueAtTime(val, this.context.currentTime);
    } else this.volume = val;
  }
}

let note = new Sound(context);

function playOscillator() {
  note.play();
}

function stopOscillator() {
  note.stop();
}

let pad = document.querySelector('.pad');
const bounding = pad.getBoundingClientRect();

function move(e) {
  let pitch = e.x - bounding.x + 120;
  let vol = (e.y - bounding.y - 480) / -480;
  // console.log(pitch, vol);
  note.setPitch(pitch);
  note.setVolume(vol);
}

pad.addEventListener('mousedown', playOscillator);
pad.addEventListener('mouseup', stopOscillator);
pad.addEventListener('mouseleave', stopOscillator);
pad.addEventListener('mousemove', move);
