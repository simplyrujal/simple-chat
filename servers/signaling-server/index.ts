import dotenv from "dotenv";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

dotenv.config();

const PORT = parseInt(process.env.SIGNALING_PORT || "8080", 10);
const HOST = "0.0.0.0";

const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }
  res.writeHead(200);
  res.end("Signaling server running");
});

const wss = new WebSocketServer({ server: httpServer });
const clients = new Map<string, WebSocket>();

wss.on("connection", (ws: WebSocket, req) => {
  const remoteAddress = req.socket.remoteAddress;

  let currentUserId: string | null = null;

  ws.on("message", (data: WebSocket.Data) => {
    try {
      const message = JSON.parse(data.toString());
      const { type, targetUserId, ...payload } = message;

      if (type === "register") {
        currentUserId = message.userId;
        clients.set(currentUserId!, ws);
        ws.send(JSON.stringify({ type: "registered", userId: currentUserId }));
        return;
      }

      if (!currentUserId) {
        ws.send(
          JSON.stringify({ type: "error", message: "You must register first" }),
        );
        return;
      }

      if (targetUserId) {
        const targetWs = clients.get(targetUserId);
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
          targetWs.send(
            JSON.stringify({
              type,
              from: currentUserId,
              ...payload,
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

httpServer.listen(PORT, HOST, () => {
  console.log(`\n🚀 Signaling server listening on: ws://${HOST}:${PORT}`);
});
