import React from "react";
import { AudioMessage, FileMessage, ImageMessage, TextMessage, VideoMessage } from "./components";
import UserInfo from "./user-info";
import { TMessage } from "/imports/collections/message";
import { useIntersectionObserver } from "/imports/ui/shared/hooks/use-intersection-observer";

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

  const ref = useIntersectionObserver({
    options: {
      threshold: 0.5,
    },
    callback: (isIntersecting) => {
      console.log(isIntersecting);
    },
  })

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      ref={ref}
      className={`flex w-full ${isCurrentUser ? "justify-end" : "justify-start"} animate-fade-in-up`}
    >
      <div
        className={`flex flex-col max-w-[75%] md:max-w-[65%] lg:max-w-[55%] ${isCurrentUser ? "items-end" : "items-start"
          }`}
      >
        {!isCurrentUser && otherUserId && (
          <UserInfo otherUserId={otherUserId} isCurrentUser={isCurrentUser} />
        )}

        <div
          className={`mt-1 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${isCurrentUser
            ? "bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-md shadow-glow hover:shadow-glow"
            : "bg-gray-700/60 border border-gray-600 text-gray-100 rounded-bl-md shadow-md hover:border-primary-500/50"
            }`}
        >
          <MessageContent content={msg.content} />
        </div>

        <span
          className={`mt-1 text-xs transition-all duration-300 ${isCurrentUser ? "text-gray-500" : "text-gray-500"
            }`}
        >
          {msg.createdAt && formatTime(msg.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
