import React, { createContext, useContext } from "react";
import { useWebRTC, UseWebRTCReturn, CallState } from "./use-webrtc";

const WebRTCContext = createContext<UseWebRTCReturn | null>(null);

export const WebRTCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const webrtc = useWebRTC();

  return (
    <WebRTCContext.Provider value={webrtc}>
      {children}
    </WebRTCContext.Provider>
  );
};

export const useWebRTCContext = (): UseWebRTCReturn => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTCContext must be used within a WebRTCProvider");
  }
  return context;
};
