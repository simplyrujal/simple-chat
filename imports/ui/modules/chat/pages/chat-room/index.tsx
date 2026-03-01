import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/use-room";
import ChatProvider from "../../provider/chat-provider";
import ChatHeader from "./components/chat-header";
import ChatInput from "./components/chat-input";
import ChatMessages from "./components/chat-messages";
import ErrorRoom from "./components/error-room";
import RoomLayout from "./room-layout";
import Loading from "/imports/ui/shared/components/loading";
import { SignalingProvider } from "/imports/ui/shared/contexts/signaling-context";

export const ChatRoomPage: React.FC = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoom(chatRoomId);

  if (isRoomLoading) {
    return <Loading />;
  }

  if (!room || roomError) {
    return <ErrorRoom />;
  }

  return (
    <SignalingProvider>
      <ChatProvider roomType={room.type}>
        <RoomLayout>
          <ChatHeader room={room} />
          <ChatMessages roomId={room._id} />
          <ChatInput room={room} />
        </RoomLayout>
      </ChatProvider>
    </SignalingProvider>
  );
};
