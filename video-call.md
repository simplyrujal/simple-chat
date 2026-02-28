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
  socket.current = new WebSocket("ws://localhost:8080");

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
