import { Meteor } from "meteor/meteor";
import React from "react";
import { useSendMessage } from "../../hooks/use-messages";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

const ChatInput: React.FC<IProps> = ({ room }) => {
  const [message, setMessage] = React.useState("");
  const sendMessage = useSendMessage();

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
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
  return (
    <div className="p-3 border-t bg-white">
      <form onSubmit={handleMessageSend}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Send
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
