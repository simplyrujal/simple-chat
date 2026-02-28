import { Meteor } from "meteor/meteor";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type CallType = "audio" | "video";

export interface CallRequest {
    callId: string;
    from: string;
    callType: CallType;
    roomId?: string;
}

export interface CallResponse {
    callId: string;
    from: string;
    message: "accepted" | "rejected";
    roomId?: string;
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
            console.log("Signaling connected to:", url);
            setIsConnected(true);
            ws.send(JSON.stringify({ type: "register", userId }));
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log("Signaling message received:", message.type, message);

                switch (message.type) {
                    case "call-request":
                        setIncomingCall({
                            callId: message.callId,
                            from: message.from,
                            callType: message.callType,
                            roomId: message.roomId
                        });
                        break;
                    case "call-response":
                        if (message.message === "accepted") {
                            const roomName = `chat-room-${message.roomId}-${message.callId}`;
                            setActiveCall({
                                callId: message.callId,
                                roomName,
                                callType: "video", // Default to video if not specified, but usually we know from context
                                targetUserId: message.from,
                                callerName: message.from // In a real app, look up the name
                            });
                        } else {
                            console.log("Call rejected by", message.from);
                            // Optionally show a notification
                        }
                        break;
                    case "call-ended":
                        setActiveCall(null);
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
            setTimeout(() => {
                if (Meteor.userId()) {
                    connect();
                }
            }, 3000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, [userId]);

    useEffect(() => {
        connect();
        return () => {
            wsRef.current?.close();
        };
    }, [connect]);

    const sendCallRequest = useCallback((targetUserId: string, callType: CallType, roomId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected");
            return null;
        }
        const callId = `${userId}-${Date.now()}`;
        wsRef.current.send(JSON.stringify({
            type: "call-request",
            targetUserId,
            callId,
            callType,
            roomId
        }));
        return callId;
    }, [userId]);

    const sendCallResponse = useCallback((targetUserId: string, callId: string, message: "accepted" | "rejected", roomId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected");
            return;
        }
        wsRef.current.send(JSON.stringify({
            type: "call-response",
            targetUserId,
            callId,
            message,
            roomId
        }));
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
    if (context === undefined) {
        throw new Error("useSignalingContext must be used within a SignalingProvider");
    }
    return context;
};
