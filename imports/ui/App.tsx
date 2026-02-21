import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "flowbite-react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./modules/admin/routes";
import { AuthRoutes } from "./modules/auth/routes";
import { ChatRoutes } from "./modules/chat/routes";
import { RequireAuth } from "./shared/components/require-auth";
import { SignalingTest } from "./shared/components/signaling-test";
import { VideoCallUI } from "./shared/components/video-call-ui";
import { WebRTCProvider, useWebRTCContext } from "./shared/hooks/use-webrtc-context";
import useGlobalSubscriptions from "./shared/hooks/use-global-subscriptions";
import theme from "./shared/theme";
import registerCollection from "./shared/utils/registerCollection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

registerCollection("RoomCollection");
registerCollection("UsersCollection");
registerCollection("RoomMemberCollection");
registerCollection("MessageCollection");
registerCollection("MediaCollection");

const WebRTCCallManager: React.FC = () => {
  const {
    callState,
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
  } = useWebRTCContext();

  return (
    <VideoCallUI
      callState={callState}
      localStream={localStream}
      remoteStream={remoteStream}
      isMuted={isMuted}
      isVideoOff={isVideoOff}
      onAnswer={() => callState.callId && answerCall(callState.callId)}
      onReject={() => callState.callId && rejectCall(callState.callId)}
      onEndCall={endCall}
      onToggleMute={toggleMute}
      onToggleVideo={toggleVideo}
    />
  );
};

export const App: React.FC = () => {
  useGlobalSubscriptions();
  return (
    <QueryClientProvider client={queryClient}>
      <WebRTCProvider>
        <SignalingTest />
        <WebRTCCallManager />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/auth/*" element={<AuthRoutes />} />

              {/* Protected Routes */}
              <Route element={<RequireAuth />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<ChatRoutes />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </WebRTCProvider>
    </QueryClientProvider>
  );
};
