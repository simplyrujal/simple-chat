import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useCallback } from "react";
import { useSendMessage } from "../../../hooks/use-messages";

import { useChatInput } from "../context/chat-input-provider";
import FileInputs from "./file-inputs";
import MediaOutput from "./media-output";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

const ChatInput: React.FC<IProps> = ({ room }) => {
  const [message, setMessage] = React.useState("");
  const [media, setMedia] = React.useState<Blob | null>(null);
  const { mediaType, setMediaType } = useChatInput();

  const sendMessage = useSendMessage();

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message && !media) return;
    const currentUserId = Meteor.userId();

    const names = room.name.split("-");
    const otherUser = names.find((name) => name !== currentUserId);

    await sendMessage.mutateAsync({
      to: otherUser || "",
      content: { type: mediaType, text: message },
      roomId: room._id,
    });

    setMessage("");
    handleMediaClear();
  };

  const handleMediaClear = () => {
    setMedia(null);
    setMediaType("text");
  };

  const handleMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
      setMediaType("text");
    },
    [],
  );

  return (
    <div className="p-3 bg-white">
      {media && mediaType && (
        <MediaOutput
          mediaType={mediaType}
          media={media}
          handleMediaClear={handleMediaClear}
        />
      )}
      <form onSubmit={handleMessageSend}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessage}
            className="input-field w-4/5"
          />

          <Button color="primary" type="submit" className="w-1/5" size="md">
            Send
          </Button>
        </div>
        <FileInputs setMedia={setMedia} />
      </form>
    </div>
  );
};

export default ChatInput;
