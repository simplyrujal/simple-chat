import React, { createContext, useCallback, useContext, useState } from "react";

interface IChatContext {
  // Simple state for now - can be extended later
  activeRoomId: string | null;
  setActiveRoomId: (id: string | null) => void;
  roomType: string;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
  roomType: "direct" | "channel";
}

const ChatProvider: React.FC<IProps> = ({ children, roomType }) => {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const handleSetActiveRoomId = useCallback((id: string | null) => {
    setActiveRoomId(id);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        activeRoomId,
        setActiveRoomId: handleSetActiveRoomId,
        roomType,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
