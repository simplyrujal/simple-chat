import { Meteor } from "meteor/meteor";
import React, { useCallback, useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Button } from "flowbite-react";
import { VideoIcon } from "/imports/ui/shared/icons";
import { useSignaling } from "/imports/ui/shared/hooks/use-signaling";
import IncomingCallModal from "/imports/ui/shared/components/incoming-call-modal";
import JitsiMeetingComponent from "/imports/ui/shared/components/jitsi-meeting";
import { TRooms } from "/imports/collections/room";

interface VideoActionProps {
  room: TRooms;
}

const VideoAction: React.FC<VideoActionProps> = ({ room }) => {
  const currentUserId = Meteor.userId() ?? null;
  const currentUser = useTracker(() => Meteor.user());
  const [activeCall, setActiveCall] = useState<{
    callId: string;
    roomName: string;
  } | null>(null);

  const roomUserIds = room.name.split("-");
  const targetUserId = roomUserIds.find((id) => id !== currentUserId) ?? null;

  const getCallerName = useCallback((userId: string) => {
    return userId;
  }, []);

  const {
    incomingCall,
    sendCallRequest,
    sendCallResponse,
    clearIncomingCall,
    setCallbacks,
  } = useSignaling(currentUserId);

  useEffect(() => {
    setCallbacks({
      onCallRequest: (request) => {
        console.log("Incoming call request:", request);
      },
      onCallResponse: (response) => {
        if (response.message === "accepted" && response.from === targetUserId) {
          const roomName = `chat-room-${room._id}-${response.callId}`;
          setActiveCall({ callId: response.callId, roomName });
        }
      },
    });
  }, [setCallbacks, room._id, targetUserId]);

  const handleVideoCall = useCallback(() => {
    if (!targetUserId || !currentUserId) return;
    const callId = sendCallRequest(targetUserId, "video");
    if (callId) {
      const roomName = `chat-room-${room._id}-${callId}`;
      setActiveCall({ callId, roomName });
    }
  }, [targetUserId, currentUserId, room._id, sendCallRequest]);

  const handleAcceptCall = useCallback(() => {
    if (!incomingCall) return;
    sendCallResponse(incomingCall.from, incomingCall.callId, "accepted");
    const roomName = `chat-room-${room._id}-${incomingCall.callId}`;
    setActiveCall({ callId: incomingCall.callId, roomName });
    clearIncomingCall();
  }, [incomingCall, room._id, sendCallResponse, clearIncomingCall]);

  const handleRejectCall = useCallback(() => {
    if (!incomingCall) return;
    sendCallResponse(incomingCall.from, incomingCall.callId, "rejected");
    clearIncomingCall();
  }, [incomingCall, sendCallResponse, clearIncomingCall]);

  const handleLeaveMeeting = useCallback(() => {
    setActiveCall(null);
  }, []);

  if (activeCall) {
    return (
      <JitsiMeetingComponent
        roomName={activeCall.roomName}
        userName={currentUser?.username || "User"}
        onLeave={handleLeaveMeeting}
      />
    );
  }

  return (
    <>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Video Call"
        onClick={handleVideoCall}
      >
        <VideoIcon className="w-4 h-4" />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={handleVideoCall}
      >
        <VideoIcon className="w-4 h-4" />
        <span className="ml-2">Video</span>
      </Button>
      <IncomingCallModal
        isOpen={!!incomingCall}
        callerName={incomingCall ? getCallerName(incomingCall.from) : ""}
        callType={incomingCall?.callType || "video"}
        onAccept={handleAcceptCall}
        onReject={handleRejectCall}
      />
    </>
  );
};

export default VideoAction;
