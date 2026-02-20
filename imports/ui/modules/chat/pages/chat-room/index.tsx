import React from "react";
import { useParams } from "react-router-dom";
import CallModal from "../../components/call-modal";
import { useRoom } from "../../hooks/use-room";
import { useRoomMembers } from "../../hooks/use-room-members";
import CallProvider from "../../provider/call-provider";
import ChatHeader from "./components/chat-header";
import ChatInput from "./components/chat-input";
import ChatMessages from "./components/chat-messages";
import ErrorRoom from "./components/error-room";
import RoomLayout from "./room-layout";
import RoomAction from "./room-layout/room-header/room-action";
import Loading from "/imports/ui/shared/components/loading";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";
import ChatProvider from "../../provider/chat-provider";

// Inner component that can use useCall hook
const ChatRoomContent: React.FC = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoom(chatRoomId);
  const { data: members, isLoading: isMembersLoading } =
    useRoomMembers(chatRoomId);
  const { user } = useAuth();

  // Import useCall inside the component
  const { useCall } = require("../../provider/call-provider");
  const {
    callInfo,
    localStream,
    remoteStream,
    answerCall,
    rejectCall,
    endCall,
  } = useCall();

  // Get the target user ID (the other participant in a direct chat)
  const targetUserId = React.useMemo(() => {
    if (!members || !user?._id) return undefined;
    const otherMember = members.find((m: any) => m.userId !== user._id);
    return otherMember?.userId;
  }, [members, user?._id]);

  const isIncoming = callInfo?.calleeId === user?._id;

  if (isRoomLoading || isMembersLoading) {
    return <Loading />;
  }

  if (!room || roomError) {
    return <ErrorRoom />;
  }

  return (
    <ChatProvider roomType={room.type}>
      <RoomLayout>
        <ChatHeader room={room} />
        <div className="flex items-center gap-1 sm:gap-2">
          <RoomAction targetUserId={targetUserId} />
        </div>
        <ChatMessages roomId={room._id} />
        <ChatInput room={room} />
      </RoomLayout>

      {/* Call Modal */}
      <CallModal
        isOpen={!!callInfo}
        callInfo={callInfo}
        localStream={localStream}
        remoteStream={remoteStream}
        isIncoming={isIncoming}
        callerName="User"
        onAccept={() => callInfo && answerCall(callInfo)}
        onReject={rejectCall}
        onEndCall={endCall}
      />
    </ChatProvider>
  );
};

// Main page component that provides the context
const ChatRoomPage: React.FC = () => {
  return (
    <CallProvider>
      <ChatRoomContent />
    </CallProvider>
  );
};

export default ChatRoomPage;
