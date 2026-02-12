import React from "react";
import { TMessage } from "/imports/collections/message";
import { useGetUser } from "/imports/ui/shared/hooks/user/use-user";

interface MessageProps {
  msg: TMessage;
  currentUserId: string;
}

const currentUserName = "You";

const Message: React.FC<MessageProps> = ({ msg, currentUserId }) => {
  const isCurrentUser = msg.from === currentUserId;
  const otherUserId = isCurrentUser ? msg.to : msg.from;
  const { data, isLoading, error } = useGetUser(otherUserId || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`flex mb-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div className="w-full max-w-[85%] md:max-w-[70%] lg:max-w-[60%]">
        <div
          className={`p-3 rounded-xl shadow-sm ${
            isCurrentUser ? "bg-primary-600 text-white" : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span
              className={`font-semibold text-xs ${
                isCurrentUser ? "text-white/80" : "text-primary-600"
              }`}
            >
              {isCurrentUser ? currentUserName : data?.profile?.name}
            </span>

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
