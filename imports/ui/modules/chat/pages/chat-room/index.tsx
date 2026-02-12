import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRoom } from "../../hooks/use-room";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

export const ChatRoomPage: React.FC = () => {
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoom(chatRoomId);

  if (isRoomLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!room || roomError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-4 flex justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Room Not Available
          </h3>

          <p className="text-gray-500 mb-6">
            The chat room you are looking for does not exist or you don&apos;t have
            access to it.
          </p>

          <Link
            to="/dashboard"
            className="inline-block px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <ChatHeader room={room} />
      <ChatMessages roomId={room._id} />
      <ChatInput room={room} />
    </div>
  );
};
