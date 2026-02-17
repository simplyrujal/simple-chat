import React, { createContext, useContext, useState } from "react";
import { TMessageType } from "/imports/collections/message";

interface IChatInputContext {
  mediaType: TMessageType;
  setMediaType: (type: TMessageType) => void;
}

const ChatInputContext = createContext<IChatInputContext | undefined>(
  undefined,
);

export const useChatInput = (): IChatInputContext => {
  const context = useContext(ChatInputContext);
  if (!context) {
    throw new Error("useChatInput must be used within a ChatInputProvider");
  }
  return context;
};

const ChatInputProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mediaType, setMediaType] = useState<TMessageType>("text");

  return (
    <ChatInputContext.Provider value={{ mediaType, setMediaType }}>
      {children}
    </ChatInputContext.Provider>
  );
};

export default ChatInputProvider;
