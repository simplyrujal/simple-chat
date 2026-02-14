import { Meteor } from "meteor/meteor";
import React, { useEffect, useRef } from "react";
import { useSubscribeMessages } from "../../../hooks/use-messages";
import Message from "./message";
import NoMessages from "./no-messages";

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
          <NoMessages />
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
