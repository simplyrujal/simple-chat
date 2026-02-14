import React from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../../hooks/use-room";
import ChatProvider from "../../provider/chat-provider";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import EmptyRoom from "./empty-room";
import RoomLayout from "./room-layout";
import Loading from "/imports/ui/shared/components/loading";

interface ChatRoomPageProps {
  onBackClick?: () => void;
  onToggleMobile?: () => void;
}

export const ChatRoomPage: React.FC<ChatRoomPageProps> = ({
  onToggleMobile,
}) => {
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
    return <EmptyRoom />;
  }

  return (
    <ChatProvider roomType={room.type}>
      <RoomLayout onToggleMobile={onToggleMobile}>
        <ChatHeader room={room} />
        <ChatMessages roomId={room._id} />
        <ChatInput room={room} />
      </RoomLayout>
    </ChatProvider>
  );
};
