import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/use-room";
import ChatHeader from "./components/chat-header";
import ChatInput from "./components/chat-input";
import ChatMessages from "./components/chat-messages";
import ErrorRoom from "./components/error-room";
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
    <RoomLayout roomType={room.type}>
      <ChatHeader room={room} />
      <ChatMessages roomId={room._id} />
      <ChatInput room={room} />
    </RoomLayout>
  );
};
