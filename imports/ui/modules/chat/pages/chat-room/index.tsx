import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/use-room";
import ChatProvider from "../../provider/chat-provider";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import ErrorRoom from "./error-room";
import RoomLayout from "./room-layout";
import Loading from "/imports/ui/shared/components/loading";

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
    <ChatProvider roomType={room.type}>
      <RoomLayout>
        <ChatHeader room={room} />
        <ChatMessages roomId={room._id} />
        <ChatInput room={room} />
      </RoomLayout>
    </ChatProvider>
  );
};
