import { Meteor } from "meteor/meteor";
import React from "react";
import { useSubscribeMessages } from "../../../hooks/use-messages";
import Message from "./message";

const ChatMessages: React.FC<{ roomId: string }> = ({ roomId }) => {
  const messages = useSubscribeMessages(roomId);

  const currentUserId = Meteor.userId();

  return (
    <div className="w-full flex-1 overflow-auto p-4 bg-gray-100 flex flex-col scrollbar-thin">
      {currentUserId && messages && messages.length > 0 ? (
        messages.map((msg) => (
          <Message key={msg._id} msg={msg} currentUserId={currentUserId} />
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <div className="mb-3">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
            </svg>
          </div>

          <p className="text-center text-sm">
            No messages yet.
            <br />
            Start the conversation!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
