import { Meteor } from "meteor/meteor";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type CallType = "audio" | "video";

export interface CallRequest {
    callId: string;
    from: string;
    callerName: string;
    callType: CallType;
    roomId: string;
}

export interface ActiveCall {
    callId: string;
    callType: CallType;
    targetUserId: string;
    callerName: string;
    isCaller: boolean;
}

// WebRTC Signal types handled by the signaling server
export type WebRTCSignalType = "webrtc-offer" | "webrtc-answer" | "webrtc-ice-candidate";

export interface WebRTCSignal {
    type: WebRTCSignalType;
    from: string;
    callId: string;
    offer?: RTCSessionDescriptionInit;
    answer?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidateInit;
}

type WebRTCSignalHandler = (signal: WebRTCSignal) => void;

interface SignalingContextType {
    isConnected: boolean;
    incomingCall: CallRequest | null;
    activeCall: ActiveCall | null;
    sendCallRequest: (targetUserId: string, callType: CallType, roomId: string, callerName?: string) => string | null;
    sendCallResponse: (targetUserId: string, callId: string, message: "accepted" | "rejected", roomId: string) => void;
    startActiveCall: (call: ActiveCall) => void;
    endCall: () => void;
    clearIncomingCall: () => void;
    // WebRTC signaling
    sendWebRTCOffer: (targetUserId: string, offer: RTCSessionDescriptionInit, callId: string) => void;
    sendWebRTCAnswer: (targetUserId: string, answer: RTCSessionDescriptionInit, callId: string) => void;
    sendICECandidate: (targetUserId: string, candidate: RTCIceCandidateInit, callId: string) => void;
    onWebRTCSignal: (handler: WebRTCSignalHandler | null) => void;
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
    // Reference to WebRTC signal handler (set by the call component)
    const webrtcSignalHandlerRef = useRef<WebRTCSignalHandler | null>(null);
    // Track outgoing call info so we can restore it when callee accepts
    const pendingCallRef = useRef<{ callId: string; callType: CallType; targetUserId: string; callerName: string } | null>(null);

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
                        setIncomingCall({
                            callId: message.callId,
                            from: message.from,
                            callerName: message.callerName || message.from,
                            callType: message.callType,
                            roomId: message.roomId || "global"
                        });
                        break;

                    case "call-response":
                        if (message.message === "accepted" && pendingCallRef.current) {
                            // The callee accepted our call — we are the caller (isCaller: true)
                            setActiveCall({
                                callId: pendingCallRef.current.callId,
                                callType: pendingCallRef.current.callType,
                                targetUserId: pendingCallRef.current.targetUserId,
                                callerName: pendingCallRef.current.callerName,
                                isCaller: true,
                            });
                            pendingCallRef.current = null;
                        } else {
                            console.log("❌ Call rejected");
                            pendingCallRef.current = null;
                            setActiveCall(null);
                        }
                        break;

                    case "call-ended":
                        setActiveCall(null);
                        break;

                    // WebRTC signaling — delegate to the active call component
                    case "webrtc-offer":
                    case "webrtc-answer":
                    case "webrtc-ice-candidate":
                        if (webrtcSignalHandlerRef.current) {
                            webrtcSignalHandlerRef.current(message as WebRTCSignal);
                        }
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

    const sendCallRequest = useCallback((targetUserId: string, callType: CallType, roomId: string, callerName?: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return null;

        const payload = {
            type: "call-request",
            targetUserId,
            callId: roomId,
            callType,
            roomId: roomId || "global",
            callerName: callerName || userId,
        };

        // Store pending call so we can restore it when accepted
        pendingCallRef.current = { callId: roomId, callType, targetUserId, callerName: callerName || targetUserId };

        console.log("📤 Sending call request:", payload);
        wsRef.current.send(JSON.stringify(payload));
        return roomId;
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

    // --- WebRTC Signaling Methods ---
    const sendWebRTCOffer = useCallback((targetUserId: string, offer: RTCSessionDescriptionInit, callId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        console.log("📤 Sending WebRTC offer");
        wsRef.current.send(JSON.stringify({ type: "webrtc-offer", targetUserId, offer, callId }));
    }, []);

    const sendWebRTCAnswer = useCallback((targetUserId: string, answer: RTCSessionDescriptionInit, callId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        console.log("📤 Sending WebRTC answer");
        wsRef.current.send(JSON.stringify({ type: "webrtc-answer", targetUserId, answer, callId }));
    }, []);

    const sendICECandidate = useCallback((targetUserId: string, candidate: RTCIceCandidateInit, callId: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        wsRef.current.send(JSON.stringify({ type: "webrtc-ice-candidate", targetUserId, candidate, callId }));
    }, []);

    const onWebRTCSignal = useCallback((handler: WebRTCSignalHandler | null) => {
        webrtcSignalHandlerRef.current = handler;
    }, []);

    return (
        <SignalingContext.Provider value={{
            isConnected,
            incomingCall,
            activeCall,
            sendCallRequest,
            sendCallResponse,
            startActiveCall: setActiveCall,
            endCall,
            clearIncomingCall,
            sendWebRTCOffer,
            sendWebRTCAnswer,
            sendICECandidate,
            onWebRTCSignal,
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
