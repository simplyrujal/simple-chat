// WebRTC Signaling Service - connects to the WebSocket signaling server

const SIGNALING_URL = "ws://localhost:8080";

type MessageType =
  | "register"
  | "signal"
  | "error"
  | "call-request"
  | "call-response"
  | "call-ended";

interface SignalingMessage {
  type: MessageType;
  userId?: string;
  targetUserId?: string;
  signal?: RTCSessionDescriptionInit | RTCIceCandidateInit;
  from?: string;
  message?: string;
  callId?: string;
  callType?: "audio" | "video";
}

type MessageHandler = (message: SignalingMessage) => void;

class WebRTCSignalingService {
  private ws: WebSocket | null = null;
  private userId: string | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.register(userId);
        resolve();
        return;
      }

      if (this.isConnecting) {
        // Wait for existing connection attempt
        const checkConnection = setInterval(() => {
          if (this.ws?.readyState === WebSocket.OPEN) {
            clearInterval(checkConnection);
            this.register(userId);
            resolve();
          }
        }, 100);
        return;
      }

      this.isConnecting = true;

      try {
        this.ws = new WebSocket(SIGNALING_URL);

        this.ws.onopen = () => {
          console.log("WebSocket connected to signaling server");
          this.isConnecting = false;
          this.register(userId);
          resolve();
        };

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = () => {
          console.log("WebSocket disconnected from signaling server");
          this.isConnecting = false;
          this.attemptReconnect();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: SignalingMessage = JSON.parse(event.data);
            this.notifyHandlers(message);
          } catch (err) {
            console.error("Error parsing message:", err);
          }
        };
      } catch (error) {
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  private register(userId: string) {
    this.userId = userId;
    this.send({
      type: "register",
      userId,
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`,
    );

    setTimeout(() => {
      if (this.userId) {
        this.connect(this.userId).catch(console.error);
      }
    }, delay);
  }

  send(message: SignalingMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  sendSignal(
    targetUserId: string,
    signal: RTCSessionDescriptionInit | RTCIceCandidateInit,
  ) {
    this.send({
      type: "signal",
      targetUserId,
      signal,
    });
  }

  sendCallRequest(
    targetUserId: string,
    callType: "audio" | "video",
    callId: string,
  ) {
    this.send({
      type: "call-request",
      targetUserId,
      callType,
      callId,
    });
  }

  sendCallResponse(targetUserId: string, callId: string, accepted: boolean) {
    this.send({
      type: "call-response",
      targetUserId,
      callId,
      message: accepted ? "accepted" : "rejected",
    });
  }

  sendCallEnded(targetUserId: string, callId: string) {
    this.send({
      type: "call-ended",
      targetUserId,
      callId,
    });
  }

  onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    return () => {
      this.messageHandlers.delete(handler);
    };
  }

  private notifyHandlers(message: SignalingMessage) {
    this.messageHandlers.forEach((handler) => handler(message));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.userId = null;
    this.reconnectAttempts = 0;
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Singleton instance
export const signalingService = new WebRTCSignalingService();

export default signalingService;
