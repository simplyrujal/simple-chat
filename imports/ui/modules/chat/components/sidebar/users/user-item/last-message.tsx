import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import React from "react";

interface LastMessageProps {
  roomId: string | null;
  currentUserId: string | undefined;
  isActive: boolean;
  otherUserName: string;
}

const LastMessage: React.FC<LastMessageProps> = ({
  roomId,
  currentUserId,
  isActive,
  otherUserName,
}) => {
  const { data: lastMessage } = useQuery({
    queryKey: ["lastMessage", roomId],
    queryFn: () => Meteor.callAsync("get.lastMessage", roomId),
    enabled: !!roomId,
  });

  const getLastMessageText = () => {
    if (!lastMessage) return "No messages yet";

    const isSentByMe = lastMessage.from === currentUserId;
    const prefix = isSentByMe ? "You: " : `${otherUserName}: `;

    if (lastMessage.content?.type === "text") {
      return prefix + (lastMessage.content.text || "");
    } else if (lastMessage.content?.type === "image") {
      return prefix + "Sent an image";
    } else if (lastMessage.content?.type === "video") {
      return prefix + "Sent a video";
    } else if (lastMessage.content?.type === "audio") {
      return prefix + "Sent an audio";
    } else if (lastMessage.content?.type === "file") {
      return prefix + `Sent a file: ${lastMessage.content.fileName || "file"}`;
    }
    return "No messages yet";
  };

  return (
    <span
      className={`truncate text-xs ${isActive ? "text-white/70" : "text-gray-500"
        }`}
    >
      {getLastMessageText()}
    </span>
  );
};

export default LastMessage;
