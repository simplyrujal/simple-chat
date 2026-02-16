import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useRef } from "react";
import { useSendMessage } from "../../../hooks/use-messages";
import { TRooms } from "/imports/collections/room";
import {
  AttachmentIcon,
  AudioIcon,
  ImageIcon,
  VideoIcon,
} from "/imports/ui/shared/icons";

interface IProps {
  room: TRooms;
}

type MessageType = "text" | "image" | "file" | "audio" | "video";

const ChatInput: React.FC<IProps> = ({ room }) => {
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState<MessageType>("text");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const sendMessage = useSendMessage();

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: MessageType,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessageType(type);
    }
  };

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    const currentUserId = Meteor.userId();

    const names = room.name.split("-");
    const otherUser = names.find((name) => name !== currentUserId);

    await sendMessage.mutateAsync({
      to: otherUser || "",
      content: message,
      roomId: room._id,
    });

    setMessage("");
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  return (
    <div className="p-3 bg-white">
      <form onSubmit={handleMessageSend}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field w-4/5"
          />

          <Button color="primary" type="submit" className="w-1/5" size="md">
            Send
          </Button>
        </div>
        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e, "image")}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e, "video")}
          />
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e, "audio")}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            className="hidden"
            onChange={(e) => handleFileSelect(e, "file")}
          />

          <button
            type="button"
            onClick={() => triggerFileInput(imageInputRef)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Send Image"
          >
            <ImageIcon size={18} />
          </button>

          <button
            type="button"
            onClick={() => triggerFileInput(videoInputRef)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Send Video"
          >
            <VideoIcon size={18} />
          </button>

          <button
            type="button"
            onClick={() => triggerFileInput(audioInputRef)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Send Audio"
          >
            <AudioIcon size={18} />
          </button>

          <button
            type="button"
            onClick={() => triggerFileInput(fileInputRef)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Send File"
          >
            <AttachmentIcon size={18} />
          </button>
        </div>
      </form>

      <small className="block mt-2 text-gray-500">
        This is a preview of the chat room functionality.
      </small>
    </div>
  );
};

export default ChatInput;
