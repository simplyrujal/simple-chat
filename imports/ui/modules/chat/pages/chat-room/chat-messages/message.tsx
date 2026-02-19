import React from "react";
import UserInfo from "./user-info";
import { TMessage } from "/imports/collections/message";
import { ImageMessage, VideoMessage, AudioMessage, TextMessage, FileMessage } from "./components";

interface MessageContentProps {
  content: TMessage["content"];
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  switch (content?.type) {
    case "image":
      return (
        <ImageMessage fileUrl={content.fileUrl} fileName={content.fileName} />
      );
    case "video":
      return <VideoMessage fileUrl={content.fileUrl} />;
    case "audio":
      return <AudioMessage fileUrl={content.fileUrl} />;
    case "file":
      return (
        <FileMessage
          fileUrl={content.fileUrl}
          fileName={content.fileName}
          fileSize={content.fileSize}
        />
      );
    default:
      return <TextMessage text={content?.text} />;
  }
};

interface MessageProps {
  msg: TMessage;
  currentUserId: string;
}

const Message: React.FC<MessageProps> = ({ msg, currentUserId }) => {
  const isCurrentUser = msg.from === currentUserId;
  const otherUserId = isCurrentUser ? msg.to : msg.from;

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex w-full ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex flex-col max-w-[75%] md:max-w-[65%] lg:max-w-[55%] ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        {!isCurrentUser && otherUserId && (
          <UserInfo otherUserId={otherUserId} isCurrentUser={isCurrentUser} />
        )}

        <div
          className={`mt-1 px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
            isCurrentUser
              ? "bg-linear-to-br from-primary-600 to-primary-700 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
          }`}
        >
          <MessageContent content={msg.content} />
        </div>

        <span
          className={`mt-1 text-xs ${
            isCurrentUser ? "text-gray-400" : "text-gray-400"
          }`}
        >
          {msg.createdAt && formatTime(msg.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
