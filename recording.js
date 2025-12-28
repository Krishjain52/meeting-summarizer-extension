let recordedChunks = [];
let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");

startBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
};


  mediaRecorder.onstop = () => {
  const finalBlob = new Blob(recordedChunks, { type: "audio/webm" });
  const audioUrl = URL.createObjectURL(finalBlob);

  audioPlayback.src = audioUrl;
  audioPlayback.style.display = "block";

  recordedChunks = [];
  stopTimer();

};


  mediaRecorder.start(5000);
  startTimer();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }

  startBtn.disabled = false;
  stopBtn.disabled = true;
});


let seconds = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    document.getElementById("timer").innerText = `${mins}:${secs}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  seconds = 0;
}
