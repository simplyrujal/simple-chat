import { useCallback } from "react";
import { CallType, useSignalingContext } from "../contexts/signaling-context";

export const useSignaling = (roomId: string | null) => {
  const context = useSignalingContext();
  const {
    incomingCall,
    activeCall,
    sendCallRequest,
    sendCallResponse,
    clearIncomingCall,
    startActiveCall,
    endCall,
  } = context;

  const initiateCall = useCallback(
    (targetUserId: string, callType: CallType, callerName?: string) => {
      if (!roomId) return null;
      return sendCallRequest(targetUserId, callType, roomId, callerName);
    },
    [roomId, sendCallRequest],
  );

  const respondToCall = useCallback(
    (
      targetUserId: string,
      callId: string,
      message: "accepted" | "rejected",
    ) => {
      if (!roomId) return;
      return sendCallResponse(targetUserId, callId, message, roomId);
    },
    [roomId, sendCallResponse],
  );

  return {
    isConnected: context.isConnected,
    incomingCall,
    activeCall,
    sendCallRequest: initiateCall,
    sendCallResponse: respondToCall,
    clearIncomingCall,
    startActiveCall,
    endCall,
  };
};
