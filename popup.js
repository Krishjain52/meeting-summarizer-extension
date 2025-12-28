document.getElementById("openRecorder").addEventListener("click", () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("recording.html"),
  });
});
