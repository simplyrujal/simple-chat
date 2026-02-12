import React from "react";
import UserInfo from "./user-info";
import { TMessage } from "/imports/collections/message";

interface MessageProps {
  msg: TMessage;
  currentUserId: string;
}

const currentUserName = "You";

const Message: React.FC<MessageProps> = ({ msg, currentUserId }) => {
  const isCurrentUser = msg.from === currentUserId;
  const otherUserId = isCurrentUser ? msg.to : msg.from;

  return (
    <div
      className={`flex mb-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div className="w-full max-w-[85%] md:max-w-[70%] lg:max-w-[60%]">
        <div
          className={`p-3 rounded-xl shadow-sm ${
            isCurrentUser
              ? "bg-primary-600 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <UserInfo
              otherUserId={otherUserId}
              isCurrentUser={isCurrentUser}
              currentUserName={currentUserName}
            />

            {msg.createdAt && (
              <span
                className={`text-xs ${
                  isCurrentUser ? "text-white/70" : "text-gray-500"
                }`}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          <div className="text-sm leading-relaxed">{msg.content?.text}</div>

          {isCurrentUser && (
            <div className="text-right mt-1">
              <span className="text-xs text-white/70" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
