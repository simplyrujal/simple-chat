import { Meteor } from "meteor/meteor";
import React from "react";
import { Button } from "react-bootstrap";
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

    const names = room.name.split('-');
    const otherUser = names.find((name) => name !== currentUserId);

    await sendMessage.mutateAsync({
      to: otherUser || '',
      content: message,
      roomId: room._id,
    })

    setMessage('')
  }
  return (
    <div className="p-3 border-top bg-white">
      <form onSubmit={handleMessageSend}>
        <div className="d-flex gap-2">
          <input type="text" className="form-control" placeholder="Type a message..." onChange={e => setMessage(e.target.value)} value={message} />
          <Button variant="primary" type="submit">Send</Button>
        </div>
      </form>
      <small className="text-muted mt-2 d-block">This is a preview of the chat room functionality.</small>
    </div>
  )
}

export default ChatInput