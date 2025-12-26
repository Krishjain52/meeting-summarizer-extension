let mediaRecorder = null;
let audioChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");

// START RECORDING
startBtn.addEventListener("click", async () => {
    try {
        console.log("Requesting microphone access...");

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstart = () => {
            console.log("Recording started");
        };

        mediaRecorder.onstop = () => {
            console.log("Recording stopped");

            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);

            audioPlayback.src = audioUrl;
            audioPlayback.style.display = "block";

            // Stop all tracks to release microphone
            stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();

        startBtn.disabled = true;
        stopBtn.disabled = false;
    } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Microphone permission denied or unavailable.");
    }
});

// STOP RECORDING
stopBtn.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    } else {
        console.log("Recorder not active.");
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
});
