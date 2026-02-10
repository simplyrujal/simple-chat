import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../use-debounce";
import { Status, User, UsersCollection } from "/imports/collections/user";

type TUsers = {
  users: User[];
  total: number;
};

interface IParams {
  searchString?: string;
  limit?: number;
  skip?: number;
}

export const useGetUser = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => Meteor.callAsync("get.user", userId),
  });
};

export const useUserList = (params?: IParams) => {
  return useQuery<TUsers>({
    queryKey: ["users.list", params],
    queryFn: () => Meteor.callAsync("users.list", params),
  });
};

export const useGetUserStatus = (userId: string) => {
  return useTracker(() => {
    if (userId) {
      Meteor.subscribe("user.info", userId);
      const user = UsersCollection.find({ _id: userId }).fetch();
      return user[0]?.status;
    }
  });
};

const IDLE_TIMEOUT = 1 * 60 * 1000; // 1 minute
const DEBOUNCE_DELAY = 1000; // 1 second
const activityEvents = [
  "mousemove",
  "keydown",
  "click",
  "scroll",
  "touchstart",
  "mousedown",
];

export const userSetStatus = (userId: string) => {
  const [activity, setActivity] = useState<Status>("online");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Debounce status updates to prevent rapid calls
  const [debouncedActivity] = useDebounce(activity, DEBOUNCE_DELAY);

  // Current user from Meteor
  const currentUser = useTracker(() => Meteor.user());

  // Determine which user to track (passed userId or current user)
  const targetUserId = userId || currentUser?._id;

  // Reset idle timer when user is active
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Set user as active
    setActivity("online");
    lastActivityRef.current = Date.now();

    // Set timer for idle detection
    idleTimerRef.current = setTimeout(() => {
      setActivity("away");
    }, IDLE_TIMEOUT);
  }, []);

  // Update status on server
  const updateUserStatus = useCallback(
    async (status: Status) => {
      if (!targetUserId) return;

      try {
        await Meteor.callAsync("user.setStatus", {
          userId: targetUserId,
          status,
        });
      } catch (error) {
        console.error("Failed to update user status:", error);
      }
    },
    [targetUserId],
  );

  // Track user activity events
  useEffect(() => {
    if (!targetUserId) return;

    // Add event listeners for activity detection
    const handleActivity = () => resetIdleTimer();

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Track online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initialize timer
    resetIdleTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });

      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [targetUserId, resetIdleTimer]);

  // Update status when activity changes
  useEffect(() => {
    if (!targetUserId || !isOnline) return;

    let status: Status = "offline";

    if (!isOnline) {
      status = "offline";
    } else if (activity === "away") {
      status = "away";
    } else {
      status = "online";
    }

    updateUserStatus(status);
  }, [debouncedActivity, isOnline, targetUserId, updateUserStatus]);

  // Track page visibility (tab switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActivity("away");
      } else {
        resetIdleTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetIdleTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return null;
};
