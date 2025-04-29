let audioContext = null;
let sentBuffer = null;
let receivedBuffer = null;
let hasInteracted = false;

// Initialize audio context on user interaction
export function initAudio() {
  if (audioContext) return;

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    hasInteracted = true;
    loadSounds();
  } catch (error) {
    console.warn('Web Audio API not supported:', error);
  }
}

// Load sound files
async function loadSounds() {
  if (!audioContext) return;

  try {
    const sentResponse = await fetch('/sounds/sent.mp3');
    const sentData = await sentResponse.arrayBuffer();
    sentBuffer = await audioContext.decodeAudioData(sentData);

    const receivedResponse = await fetch('/sounds/received.mp3');
    const receivedData = await receivedResponse.arrayBuffer();
    receivedBuffer = await audioContext.decodeAudioData(receivedData);
  } catch (error) {
    console.warn('Error loading sounds:', error);
  }
}

async function playSound(buffer) {
  if (!audioContext || !buffer || !hasInteracted) return;

  try {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    console.warn('Error playing sound:', error);
  }
}

export function playSentSound() {
  playSound(sentBuffer);
}

export function playReceivedSound() {
  playSound(receivedBuffer);
}
