import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback } from "react";
import IncomingCallModal from "../components/incoming-call-modal";
import WebRTCCall from "../components/webrtc-call";
import { useSignalingContext } from "../contexts/signaling-context";

export const CallManager: React.FC = () => {
    const {
        incomingCall,
        activeCall,
        sendCallResponse,
        clearIncomingCall,
        startActiveCall,
        endCall
    } = useSignalingContext();

    const currentUser = useTracker(() => Meteor.user());

    // Use the callerName sent in the call-request payload.
    // Falls back to the from userId if name wasn't resolved.
    const callerName = incomingCall?.callerName || incomingCall?.from || "User";

    const handleAcceptCall = useCallback(() => {
        if (!incomingCall) return;

        sendCallResponse(incomingCall.from, incomingCall.callId, "accepted", incomingCall.roomId || "global");

        startActiveCall({
            callId: incomingCall.callId,
            callType: incomingCall.callType,
            targetUserId: incomingCall.from,
            callerName: callerName,
            isCaller: false, // We are the callee (receiver)
        });

        clearIncomingCall();
    }, [incomingCall, sendCallResponse, startActiveCall, clearIncomingCall, callerName]);

    const handleRejectCall = useCallback(() => {
        if (!incomingCall) return;
        sendCallResponse(incomingCall.from, incomingCall.callId, "rejected", incomingCall.roomId || "global");
        clearIncomingCall();
    }, [incomingCall, sendCallResponse, clearIncomingCall]);

    const handleLeaveMeeting = useCallback(() => {
        endCall();
    }, [endCall]);

    return (
        <>
            <IncomingCallModal
                isOpen={!!incomingCall}
                callerName={callerName}
                callType={incomingCall?.callType || "audio"}
                onAccept={handleAcceptCall}
                onReject={handleRejectCall}
            />
            {activeCall && (
                <WebRTCCall
                    targetUserId={activeCall.targetUserId}
                    callId={activeCall.callId}
                    callType={activeCall.callType}
                    isCaller={activeCall.isCaller}
                    callerName={activeCall.callerName}
                    userName={currentUser?.profile?.name || currentUser?.username || "You"}
                    onLeave={handleLeaveMeeting}
                />
            )}
        </>
    );
};
