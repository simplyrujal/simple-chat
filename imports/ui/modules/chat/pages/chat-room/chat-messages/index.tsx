import { Meteor } from "meteor/meteor";
import React, { useEffect, useRef } from "react";
import { useSubscribeMessages } from "../../../hooks/use-messages";
import Message from "./message";

const ChatMessages: React.FC<{ roomId: string }> = ({ roomId }) => {
  const messages = useSubscribeMessages(roomId);
  const currentUserId = Meteor.userId();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-linear-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto space-y-1">
        {currentUserId && messages && messages.length > 0 ? (
          <>
            {messages.map((msg) => (
              <Message key={msg._id} msg={msg} currentUserId={currentUserId} />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500 text-center max-w-xs">
              Start the conversation by sending a message below
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
