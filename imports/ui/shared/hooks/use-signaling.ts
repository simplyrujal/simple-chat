import { useCallback, useEffect, useRef, useState } from "react";

const SIGNALING_URL = "ws://localhost:8080";

export interface CallRequest {
  callId: string;
  from: string;
  callType: "audio" | "video";
}

export interface CallResponse {
  callId: string;
  from: string;
  message: "accepted" | "rejected";
}

export interface IncomingSignal {
  from: string;
  signal: any;
}

export const useSignaling = (userId: string | null) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [incomingCall, setIncomingCall] = useState<CallRequest | null>(null);
  const [acceptedCall, setAcceptedCall] = useState<CallResponse | null>(null);
  const callbacksRef = useRef<{
    onCallRequest?: (request: CallRequest) => void;
    onCallResponse?: (response: CallResponse) => void;
    onIncomingSignal?: (signal: IncomingSignal) => void;
  }>({});

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(SIGNALING_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Signaling connected");
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "register", userId }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Signaling message:", message.type, message);

        switch (message.type) {
          case "call-request":
            setIncomingCall({
              callId: message.callId,
              from: message.from,
              callType: message.callType,
            });
            callbacksRef.current.onCallRequest?.(message);
            break;
          case "call-response":
            setAcceptedCall(message);
            callbacksRef.current.onCallResponse?.(message);
            break;
          case "signal":
            callbacksRef.current.onIncomingSignal?.(message);
            break;
          case "error":
            console.error("Signaling error:", message.message);
            break;
        }
      } catch (err) {
        console.error("Error parsing signaling message:", err);
      }
    };

    ws.onclose = () => {
      console.log("Signaling disconnected");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const setCallbacks = useCallback((callbacks: typeof callbacksRef.current) => {
    callbacksRef.current = callbacks;
  }, []);

  const sendCallRequest = useCallback(
    (targetUserId: string, callType: "audio" | "video") => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error("WebSocket not connected");
        return null;
      }
      const callId = `${userId}-${Date.now()}`;
      wsRef.current.send(
        JSON.stringify({
          type: "call-request",
          targetUserId,
          callId,
          callType,
        })
      );
      console.log("Sent call request to", targetUserId, "callId:", callId);
      return callId;
    },
    [userId]
  );

  const sendCallResponse = useCallback(
    (targetUserId: string, callId: string, message: "accepted" | "rejected") => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error("WebSocket not connected");
        return;
      }
      wsRef.current.send(
        JSON.stringify({
          type: "call-response",
          targetUserId,
          callId,
          message,
        })
      );
      console.log("Sent call response:", message, "to", targetUserId);
    },
    []
  );

  const sendSignal = useCallback((targetUserId: string, signal: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }
    wsRef.current.send(
      JSON.stringify({
        type: "signal",
        targetUserId,
        signal,
      })
    );
  }, []);

  const clearIncomingCall = useCallback(() => {
    setIncomingCall(null);
  }, []);

  const clearAcceptedCall = useCallback(() => {
    setAcceptedCall(null);
  }, []);

  return {
    isConnected,
    incomingCall,
    acceptedCall,
    sendCallRequest,
    sendCallResponse,
    sendSignal,
    clearIncomingCall,
    clearAcceptedCall,
    setCallbacks,
  };
};
