import { useWebRTCConnection } from "/imports/ui/modules/chat/hooks/use-webrtc-connection";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";

interface UseAudioCallReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isInCall: boolean;
  callInfo: any;
  error: string | null;
  startAudioCall: (targetUserId: string) => Promise<void>;
  answerAudioCall: (callInfo: any) => Promise<void>;
  endAudioCall: () => void;
  toggleAudio: (enabled: boolean) => void;
  toggleVideo: (enabled: boolean) => void;
}

export const useAudioCall = (): UseAudioCallReturn => {
  const { user } = useAuth();
  const userId = user?._id || "";

  const {
    localStream,
    remoteStream,
    isInCall,
    callInfo,
    error,
    startCall,
    answerCall,
    endCall,
    toggleAudio,
    toggleVideo,
  } = useWebRTCConnection({
    userId,
    onRemoteStream: (stream) => {
      console.log("Remote audio stream received:", stream);
    },
    onCallStarted: (callInfo) => {
      console.log("Audio call started:", callInfo);
    },
    onCallEnded: (callInfo) => {
      console.log("Audio call ended:", callInfo);
    },
  });

  const startAudioCall = async (targetUserId: string) => {
    await startCall(targetUserId, "audio");
  };

  const answerAudioCall = async (incomingCall: any) => {
    await answerCall(incomingCall);
  };

  const endAudioCall = () => {
    endCall();
  };

  return {
    localStream,
    remoteStream,
    isInCall,
    callInfo,
    error,
    startAudioCall,
    answerAudioCall,
    endAudioCall,
    toggleAudio,
    toggleVideo,
  };
};

export default useAudioCall;
