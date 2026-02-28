import { Meteor } from "meteor/meteor";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type CallType = "audio" | "video";

export interface CallRequest {
    callId: string;
    from: string;
    callType: CallType;
    roomId: string;
}

export interface ActiveCall {
    callId: string;
    roomName: string;
    callType: CallType;
    targetUserId: string;
    callerName: string;
}

interface SignalingContextType {
    isConnected: boolean;
    incomingCall: CallRequest | null;
    activeCall: ActiveCall | null;
    sendCallRequest: (targetUserId: string, callType: CallType, roomId: string) => string | null;
    sendCallResponse: (targetUserId: string, callId: string, message: "accepted" | "rejected", roomId: string) => void;
    startActiveCall: (call: ActiveCall) => void;
    endCall: () => void;
    clearIncomingCall: () => void;
}

const SignalingContext = createContext<SignalingContextType | undefined>(undefined);

const getSignalingUrl = (): string => {
    if (typeof window === "undefined") return "ws://localhost:8080";
    const host = window.location.hostname;
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${host}:8080`;
};

const generateJitsiRoomName = (roomId: string, callId: string) => {
    const cleanRoomId = (roomId || "global").replace(/[^a-zA-Z0-9]/g, "");
    const cleanCallId = (callId || "unknown").replace(/[^a-zA-Z0-9]/g, "");
    return `SimpleChat_${cleanRoomId}_${cleanCallId}`;
};

export const SignalingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState<CallRequest | null>(null);
    const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const userId = Meteor.userId();

    const connect = useCallback(() => {
        if (!userId) return;
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        const url = getSignalingUrl();
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("📶 Signaling connected");
            setIsConnected(true);
            ws.send(JSON.stringify({ type: "register", userId }));
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log("📥 Received:", message.type, message);

                switch (message.type) {
                    case "call-request":
                        // Set incoming call even if roomId is missing (graceful fallback)
                        setIncomingCall({
                            callId: message.callId,
                            from: message.from,
                            callType: message.callType,
                            roomId: message.roomId || "global"
                        });
                        break;
                    case "call-response":
                        if (message.message === "accepted") {
                            const roomName = generateJitsiRoomName(message.roomId, message.callId);
                            setActiveCall({
                                callId: message.callId,
                                roomName,
                                callType: message.callType || "video",
                                targetUserId: message.from,
                                callerName: message.from
                            });
                        } else {
                            console.log("❌ Call rejected");
                            setActiveCall(null);
                        }
                        break;
                    case "call-ended":
                        setActiveCall(null);
                        break;
                }
            } catch (err) {
                console.error("Error parsing message:", err);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            setTimeout(() => userId && connect(), 3000);
        };
    }, [userId]);

    useEffect(() => {
        connect();
        return () => wsRef.current?.close();
    }, [connect]);

    const sendCallRequest = useCallback((targetUserId: string, callType: CallType, roomId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return null;

        const callId = `${userId}-${Date.now()}`;
        const payload = {
            type: "call-request",
            targetUserId,
            callId,
            callType,
            roomId: roomId || "global"
        };

        console.log("📤 Sending call request:", payload);
        wsRef.current.send(JSON.stringify(payload));
        return callId;
    }, [userId]);

    const sendCallResponse = useCallback((targetUserId: string, callId: string, message: "accepted" | "rejected", roomId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const payload = {
            type: "call-response",
            targetUserId,
            callId,
            message,
            roomId: roomId || "global"
        };

        console.log("📤 Sending call response:", payload);
        wsRef.current.send(JSON.stringify(payload));
    }, []);

    const endCall = useCallback(() => {
        if (activeCall && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: "call-ended",
                targetUserId: activeCall.targetUserId,
                callId: activeCall.callId
            }));
        }
        setActiveCall(null);
    }, [activeCall]);

    const clearIncomingCall = useCallback(() => setIncomingCall(null), []);

    return (
        <SignalingContext.Provider value={{
            isConnected,
            incomingCall,
            activeCall,
            sendCallRequest,
            sendCallResponse,
            startActiveCall: setActiveCall,
            endCall,
            clearIncomingCall
        }}>
            {children}
        </SignalingContext.Provider>
    );
};

export const useSignalingContext = () => {
    const context = useContext(SignalingContext);
    if (!context) throw new Error("useSignalingContext must be used within SignalingProvider");
    return context;
};

export { generateJitsiRoomName };
