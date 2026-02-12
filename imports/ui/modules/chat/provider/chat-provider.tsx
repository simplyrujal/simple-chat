import React from "react";

interface IProps {
  children: React.ReactNode;
}

const ChatProvider: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};

export default ChatProvider;
