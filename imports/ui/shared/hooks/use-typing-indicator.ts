import { useCallback, useRef } from "react";
import { Meteor } from "meteor/meteor";

export function useTypingIndicator(roomId: string) {
  const isTypingRef = useRef(false);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      Meteor.call("typing.start", { roomId });
    }

    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }

    stopTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      Meteor.call("typing.stop", { roomId });
    }, 2000);
  }, [roomId]);

  const stopTyping = useCallback(() => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }
    if (isTypingRef.current) {
      isTypingRef.current = false;
      Meteor.call("typing.stop", { roomId });
    }
  }, [roomId]);

  return { handleTyping, stopTyping };
}
