const micButton = document.getElementById('mic-button');
const outputDiv = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;
// recognition.lang = 'en-US';
recognition.continuous = true;
let isRecording = false;

recognition.addEventListener('result', (event) => {
  let text = Array.from(event.results)
    .map((result) => result[0].transcript)
    .join('');

  
  outputDiv.innerHTML = ' ';
  if (event.results[0].isFinal) {
    if (text.toLowerCase().includes('stop recording')) {
      toggleRecording();
    } else if (text.toLowerCase().includes('reset input')) {
      outputDiv.innerHTML = '';
    } else {
      outputDiv.innerHTML += text + ' ';
    }
  }
});

function toggleRecording() {
  if (isRecording) {
    recognition.stop();
    micButton.classList.remove('recording');
    micButton.innerHTML = '🎙️';
  } else {
    recognition.start();
    micButton.classList.add('recording');
    micButton.innerHTML = '🔴';
  }
  isRecording = !isRecording;
}

micButton.addEventListener('click', toggleRecording);