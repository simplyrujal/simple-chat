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

type ClientMessage = RegisterMessage | SignalMessage;

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
          const { targetUserId, signal } = message;
          const targetWs = clients.get(targetUserId);
          if (targetWs && targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(
              JSON.stringify({
                type: "signal",
                from: currentUserId,
                signal,
              }),
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${targetUserId} is not online`,
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
