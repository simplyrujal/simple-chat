import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useMemo } from "react";
import IncomingCallModal from "../components/incoming-call-modal";
import JitsiMeetingComponent from "../components/jitsi-meeting";
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

    const caller = useTracker(() => {
        if (incomingCall?.from) {
            // @ts-ignore
            return Meteor.users.findOne(incomingCall.from);
        }
        return null;
    });

    const callerName = useMemo(() => {
        // @ts-ignore
        if (caller?.profile?.name) return caller.profile.name;
        // @ts-ignore
        if (caller?.username) return caller.username;
        return incomingCall?.from || "User";
    }, [caller, incomingCall]);

    const handleAcceptCall = useCallback(() => {
        if (!incomingCall) return;

        sendCallResponse(incomingCall.from, incomingCall.callId, "accepted", incomingCall.roomId || "global");

        const roomName = `chat-room-${incomingCall.roomId || "global"}-${incomingCall.callId}`;

        startActiveCall({
            callId: incomingCall.callId,
            roomName,
            callType: incomingCall.callType,
            targetUserId: incomingCall.from,
            callerName: callerName
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
                <JitsiMeetingComponent
                    roomName={activeCall.roomName}
                    userName={currentUser?.username || "User"}
                    onLeave={handleLeaveMeeting}
                    callType={activeCall.callType}
                />
            )}
        </>
    );
};
