import dotenv from "dotenv";
import WebSocket, { WebSocketServer } from "ws";

dotenv.config();

const PORT = process.env.SIGNALING_PORT || 8080;
const server = new WebSocketServer({ port: PORT as number });

// Type for connected clients: map userId -> WebSocket
const clients = new Map<string, WebSocket>();

interface RegisterMessage {
  type: "register";
  userId: string;
}

interface SignalMessage {
  type: "signal";
  targetUserId: string;
  signal: any; // RTCSessionDescription or RTCIceCandidate
}

interface CallRequestMessage {
  type: "call-request";
  targetUserId: string;
  callId: string;
  callType: "audio" | "video";
}

interface CallResponseMessage {
  type: "call-response";
  targetUserId: string;
  callId: string;
  message: "accepted" | "rejected";
}

interface CallEndedMessage {
  type: "call-ended";
  targetUserId: string;
  callId: string;
}

type ClientMessage =
  | RegisterMessage
  | SignalMessage
  | CallRequestMessage
  | CallResponseMessage
  | CallEndedMessage;

server.on("connection", (ws: WebSocket) => {
  let currentUserId: string | null = null;

  ws.on("message", (data: WebSocket.Data) => {
    try {
      const message: ClientMessage = JSON.parse(data.toString());

      switch (message.type) {
        case "register":
          currentUserId = message.userId;
          clients.set(currentUserId, ws);
          console.log(`User registered: ${currentUserId}`);
          break;

        case "signal":
          if (!currentUserId) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "You must register first",
              }),
            );
            return;
          }
          const signalMsg = message as SignalMessage;
          const targetWs = clients.get(signalMsg.targetUserId);
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(
              JSON.stringify({
                type: "signal",
                from: currentUserId,
                signal: signalMsg.signal,
              }),
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${signalMsg.targetUserId} is not online`,
              }),
            );
          }
          break;

        case "call-request":
          if (!currentUserId) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "You must register first",
              }),
            );
            return;
          }
          const callRequestMsg = message as CallRequestMessage;
          const requestTargetWs = clients.get(callRequestMsg.targetUserId);
          if (
            requestTargetWs &&
            requestTargetWs.readyState === WebSocket.OPEN
          ) {
            requestTargetWs.send(
              JSON.stringify({
                type: "call-request",
                from: currentUserId,
                callId: callRequestMsg.callId,
                callType: callRequestMsg.callType,
              }),
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${callRequestMsg.targetUserId} is not online`,
              }),
            );
          }
          break;

        case "call-response":
          if (!currentUserId) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "You must register first",
              }),
            );
            return;
          }
          const callResponseMsg = message as CallResponseMessage;
          const responseTargetWs = clients.get(callResponseMsg.targetUserId);
          if (
            responseTargetWs &&
            responseTargetWs.readyState === WebSocket.OPEN
          ) {
            responseTargetWs.send(
              JSON.stringify({
                type: "call-response",
                from: currentUserId,
                callId: callResponseMsg.callId,
                message: callResponseMsg.message,
              }),
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${callResponseMsg.targetUserId} is not online`,
              }),
            );
          }
          break;

        case "call-ended":
          if (!currentUserId) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "You must register first",
              }),
            );
            return;
          }
          const callEndedMsg = message as CallEndedMessage;
          const endedTargetWs = clients.get(callEndedMsg.targetUserId);
          if (endedTargetWs && endedTargetWs.readyState === WebSocket.OPEN) {
            endedTargetWs.send(
              JSON.stringify({
                type: "call-ended",
                from: currentUserId,
                callId: callEndedMsg.callId,
              }),
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${callEndedMsg.targetUserId} is not online`,
              }),
            );
          }
          break;

        default:
          console.log("Unknown message type:", (message as any).type);
      }
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  ws.on("close", () => {
    if (currentUserId) {
      clients.delete(currentUserId);
      console.log(`User disconnected: ${currentUserId}`);
    }
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

console.log(`Signaling server running on ws://localhost:${PORT}`);
