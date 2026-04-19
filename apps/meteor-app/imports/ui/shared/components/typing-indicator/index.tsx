import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TypingCollection } from "/imports/collections/typing";

interface TypingIndicatorProps {
  roomId: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ roomId }) => {
  const typingUsers = useTracker(() => {
    if (!roomId) return [];
    
    Meteor.subscribe("typing", roomId);
    
    const records = TypingCollection.find({ roomId }).fetch();
    
    return records.map((record) => {
      const user = Meteor.users.findOne(record.userId);
      return user?.profile?.name || user?.username || "Someone";
    });
  }, [roomId]);

  if (typingUsers.length === 0) return null;

  const label =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing...`
      : `${typingUsers.join(", ")} are typing...`;

  return (
    <div className="typing-indicator">
      <span className="typing-dots">
        <span />
        <span />
        <span />
      </span>
      <p>{label}</p>
    </div>
  );
};
