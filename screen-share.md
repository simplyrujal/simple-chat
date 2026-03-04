✅ STEP 1 — Understand the Key Difference
📷 For Camera + Mic
navigator.mediaDevices.getUserMedia()

This gives:

Camera video

Microphone audio

🖥️ For Screen Share
navigator.mediaDevices.getDisplayMedia()

This gives:

Screen video

Optional system audio

👉 This is the only main difference.

✅ STEP 2 — Create Screen Share Function
⭐ Basic Code
const startScreenShare = async () => {
try {
const screenStream = await navigator.mediaDevices.getDisplayMedia({
video: true,
audio: true,
});

    const screenTrack = screenStream.getVideoTracks()[0];

    const sender = peerConnection
      .getSenders()
      .find(s => s.track?.kind === "video");

    if (sender) {
      sender.replaceTrack(screenTrack);
    }

    localVideoRef.current.srcObject = screenStream;

} catch (err) {
console.log("User cancelled screen share");
}
};
✅ STEP 3 — Handle When User Stops Sharing

When user clicks Stop Sharing in browser popup, we must switch back to camera.

⭐ Code to Detect Stop Event
screenTrack.onended = async () => {
const cameraStream = await navigator.mediaDevices.getUserMedia({
video: true,
audio: true,
});

const cameraTrack = cameraStream.getVideoTracks()[0];

const sender = peerConnection
.getSenders()
.find(s => s.track?.kind === "video");

if (sender) {
sender.replaceTrack(cameraTrack);
}

localVideoRef.current.srcObject = cameraStream;
};
✅ STEP 4 — Simple UI Button
<button onClick={startScreenShare}>
Share Screen
</button>
✅ STEP 5 — Important Configuration Rules

These are VERY important.

🔹 1. HTTPS is Required

Screen sharing works ONLY on:

HTTPS websites

localhost

It will NOT work on HTTP.

🔹 2. Must Be Triggered by User

Browser security rule:

❌ Cannot auto-start screen share
✅ Must be started by button click

🔹 3. Only One Video Track Allowed

You cannot send:

Camera video

Screen video

at the same time in basic setup.

You must replace the video track.

🔹 4. TURN Server is Important

Screen sharing uses high bandwidth.

Without TURN:

Connection may fail

Call may connect slowly

So TURN server is strongly recommended.

✅ STEP 6 — How the Full Flow Works
User clicks "Share Screen"
↓
getDisplayMedia()
↓
Replace video track in peer connection
↓
Remote user sees screen automatically

No extra signaling is required.

✅ STEP 7 — Common Beginner Mistake

❌ Wrong way:

peerConnection.addTrack(screenTrack);

This creates duplicate video streams.

✅ Correct way:

sender.replaceTrack(screenTrack);
🧠 Easy Memory Trick

Remember this simple rule:

Camera = getUserMedia()
Screen = getDisplayMedia()
Switch = replaceTrack()
