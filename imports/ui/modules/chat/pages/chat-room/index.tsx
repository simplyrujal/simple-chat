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

interface IProps {
  onToggleSidebar?: () => void;
}

export const ChatRoomPage: React.FC<IProps> = ({ onToggleSidebar }) => {
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
        <ChatHeader room={room} onToggleSidebar={onToggleSidebar} />
        <ChatMessages roomId={room._id} />
        <ChatInput room={room} />
      </RoomLayout>
    </ChatProvider>
  );
};
