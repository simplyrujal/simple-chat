# Video Call App – Lessons 1 to 7

---

## Lesson 1 – Turn On Camera (MediaStream)

**Goal:** Access your camera and mic and display your own video.

```jsx
import { useEffect, useRef } from "react";

export default function VideoPreview() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    startCamera();
  }, []);

  return (
    <video ref={videoRef} autoPlay playsInline style={{ width: "400px" }} />
  );
}
```

---

## Lesson 2 – Understanding WebRTC Flow

**Goal:** Learn how WebRTC connects two users.

- PeerConnection → the “pipe” between two users
- Offer → call invitation (like dialing someone)
- Answer → accept the call
- ICE Candidates → network routes (paths)

**Flow:**

```
User A creates Offer → sends to Signaling Server → User B receives → creates Answer → sends back → Connection established
```

---

## Lesson 3 – Create Peer Connection and Add Camera

**Goal:** Prepare a WebRTC connection pipe and attach your camera.

```jsx
import { useEffect, useRef } from "react";

export default function VideoPreview() {
  const videoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection();

      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));
    }

    startCamera();
  }, []);

  return (
    <video ref={videoRef} autoPlay playsInline style={{ width: "400px" }} />
  );
}
```

---

## Lesson 4 – Create Offer

```jsx
const createOffer = async () => {
  const offer = await peerConnection.current.createOffer();
  await peerConnection.current.setLocalDescription(offer);
  console.log("OFFER CREATED:", offer);
};
```

- Offer = call invitation
- `setLocalDescription()` → saves your call request

---

## Lesson 5 – Connect Signaling Server and Send Offer

```jsx
const socket = useRef(null);

useEffect(() => {
  socket.current = new WebSocket("ws://localhost:5000");

  socket.current.onopen = () => console.log("Connected to signaling server");

  socket.current.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message from server:", data);
  };
}, []);

const createOffer = async () => {
  const offer = await peerConnection.current.createOffer();
  await peerConnection.current.setLocalDescription(offer);

  socket.current.send(JSON.stringify({ type: "offer", offer }));
};
```

---

## Lesson 6 – Receive Offer and Send Answer

```jsx
socket.current.onmessage = async (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "offer") {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(data.offer),
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.current.send(JSON.stringify({ type: "answer", answer }));
  }

  if (data.type === "answer") {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(data.answer),
    );
  }
};
```

---

## Lesson 7 – Exchange ICE Candidates & Remote Video

```jsx
const remoteVideoRef = useRef(null);

peerConnection.current.onicecandidate = (event) => {
  if (event.candidate) {
    socket.current.send(
      JSON.stringify({ type: "ice-candidate", candidate: event.candidate }),
    );
  }
};

if (data.type === "ice-candidate") {
  await peerConnection.current.addIceCandidate(
    new RTCIceCandidate(data.candidate),
  );
}

peerConnection.current.ontrack = (event) => {
  remoteVideoRef.current.srcObject = event.streams[0];
};
```

**Final Flow:**

1. Camera ON → PeerConnection created → Tracks added
2. Offer sent → Answer received
3. ICE candidates exchanged → Remote video appears

---

**Congratulations!** You now have a complete basic WebRTC video call system in React + MeteorJS.

---

# Next Steps – Building a Real Video Call App

## OPTION A – Build Real UI for Video Call

### Goal

Create a proper video call screen like Zoom/Meet with layout and call buttons.

### What We Will Add

- Two video boxes (My video + Remote video)
- Call start button
- Call end button
- Simple professional layout

### Example UI Structure

```jsx
<div className="call-container">
  <div className="videos">
    <video ref={videoRef} autoPlay playsInline />
    <video ref={remoteVideoRef} autoPlay playsInline />
  </div>

  <div className="controls">
    <button onClick={createOffer}>Start Call</button>
    <button onClick={endCall}>End Call</button>
  </div>
</div>
```

### End Call Logic

```js
const endCall = () => {
  peerConnection.current.close();
  socket.current.close();
  alert("Call Ended");
};
```

### What This Achieves

- Clean UI like real apps
- Proper call start/stop control
- Ready base for production features

---

## OPTION B – Add Call Controls (Mute / Camera Off)

### Goal

Allow users to:

- Mute microphone
- Turn camera ON/OFF

This is a must-have feature in real apps.

---

### 1. Mute / Unmute Microphone

#### Logic

We simply enable/disable the audio track.

```js
const toggleMute = () => {
  const audioTrack = videoRef.current.srcObject
    .getTracks()
    .find((track) => track.kind === "audio");

  audioTrack.enabled = !audioTrack.enabled;
};
```

---

### 2. Camera ON / OFF

#### Logic

Enable/disable video track.

```js
const toggleCamera = () => {
  const videoTrack = videoRef.current.srcObject
    .getTracks()
    .find((track) => track.kind === "video");

  videoTrack.enabled = !videoTrack.enabled;
};
```

---

### 3. UI Buttons for Controls

```jsx
<div className="controls">
  <button onClick={toggleMute}>Mute / Unmute</button>
  <button onClick={toggleCamera}>Camera ON/OFF</button>
</div>
```

---

## Final Result After These Steps

Your app will now support:

- Real video call layout
- Call start & end
- Microphone mute
- Camera toggle

These features make your project look like a real video calling application.

---

## Next Possible Improvements (Future Lessons)

- Screen sharing
- Multi‑user rooms
- Chat during call
- TURN server for production
- Call notifications
