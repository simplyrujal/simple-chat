import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React from "react";
import { useSendMessage } from "../../../hooks/use-messages";

import FileInputs from "./file-inputs";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

type MediaType = "video" | "audio";

const ChatInput: React.FC<IProps> = ({ room }) => {
  const [message, setMessage] = React.useState("");
  const [media, setMedia] = React.useState<Blob | null>(null);
  const [mediaType, setMediaType] = React.useState<MediaType | null>(null);

  const sendMessage = useSendMessage();

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message && !media) return;
    const currentUserId = Meteor.userId();

    const names = room.name.split("-");
    const otherUser = names.find((name) => name !== currentUserId);

    await sendMessage.mutateAsync({
      to: otherUser || "",
      content: message,
      roomId: room._id,
    });

    setMessage("");
    handleMediaClear();
  };

  const handleMediaClear = () => {
    setMedia(null);
    setMediaType(null);
  };

  return (
    <div className="p-3 bg-white">
      {media && mediaType && (
        <div className="mb-2 p-2 border rounded bg-gray-50">
          {mediaType === "video" ? (
            <video
              src={URL.createObjectURL(media)}
              controls
              className="max-h-48 w-full rounded"
            />
          ) : (
            <audio
              src={URL.createObjectURL(media)}
              controls
              className="w-full"
            />
          )}
          <button
            type="button"
            onClick={handleMediaClear}
            className="mt-1 text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}
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
        <FileInputs setMedia={setMedia} setMediaType={setMediaType} />
      </form>
    </div>
  );
};

export default ChatInput;
