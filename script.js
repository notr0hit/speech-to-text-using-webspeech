const micButton = document.getElementById('mic-button');
const outputDiv = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;
// recognition.lang = 'en-US';
recognition.continuous = true;
let isRecording = false;

recognition.addEventListener('result', (event) => {
  const detectedText= event.results[event.resultIndex][0].transcript;
  const instruction = detectedText.toLowerCase().trim();

  if (event.results[0].isFinal) {
    if (instruction == 'stop recording') {
      outputDiv.innerHTML = '';
      toggleRecording();
    } else if (instruction == 'reset input') {
      outputDiv.innerHTML = '';
    } else {
      outputDiv.innerHTML += detectedText + ' ';
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