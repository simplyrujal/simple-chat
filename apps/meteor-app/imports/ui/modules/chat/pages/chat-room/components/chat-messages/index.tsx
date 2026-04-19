import { useVirtualizer } from "@tanstack/react-virtual";
import { Meteor } from "meteor/meteor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSubscribeMessages } from "../../../../hooks/use-messages";
import Message from "./message";
import NoMessages from "./no-messages";

const PAGE_SIZE = 20;

const ChatMessages: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const messages = useSubscribeMessages(roomId, {
    limit: PAGE_SIZE,
    skip,
    sort: { createdAt: 1 },
  });
  const currentUserId = Meteor.userId();
  const parentRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  const sortedMessages = [...(messages || [])].sort(
    (a, b) =>
      new Date(a?.createdAt || "").getTime() -
      new Date(b?.createdAt || "").getTime(),
  );

  const virtualizer = useVirtualizer({
    count: sortedMessages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  });

  const handleScroll = useCallback(() => {
    if (!parentRef.current || loadingMoreRef.current || !hasMore) return;
    const { scrollTop } = parentRef.current;

    if (scrollTop < 100 && hasMore) {
      loadingMoreRef.current = true;
      setSkip((prev) => prev + PAGE_SIZE);
      setTimeout(() => {
        loadingMoreRef.current = false;
      }, 500);
    }
  }, [hasMore]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (messages && messages.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [messages]);

  // Handle scroll position when loading more messages
  useEffect(() => {
    if (parentRef.current && skip > 0) {
      const el = parentRef.current;
      const prevScrollHeight = el.scrollHeight;
      requestAnimationFrame(() => {
        const newScrollHeight = el.scrollHeight;
        el.scrollTop = newScrollHeight - prevScrollHeight;
      });
    }
  }, [skip]);

  // Scroll to bottom on initial load and room change
  useEffect(() => {
    if (
      sortedMessages.length > 0 &&
      parentRef.current &&
      isInitialLoadRef.current
    ) {
      // Wait for virtualizer to measure elements
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (parentRef.current) {
            // Scroll to the last item using virtualizer
            virtualizer.scrollToIndex(sortedMessages.length - 1, {
              align: "end",
              behavior: "auto",
            });
          }
        });
      });
      isInitialLoadRef.current = false;
    }
  }, [sortedMessages.length, virtualizer]);

  // Reset on room change
  useEffect(() => {
    isInitialLoadRef.current = true;
    setSkip(0);
    setHasMore(true);
  }, [roomId]);

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-y-auto px-4 py-6"
      style={{ background: "linear-gradient(180deg, rgba(26, 27, 38, 0.95) 0%, rgba(40, 42, 54, 0.95) 100%)" }}
    >
      <div>
        {hasMore && (
          <div className="text-center py-2 text-sm" style={{ color: "#6272a4" }}>
            Scroll up to load more messages
          </div>
        )}
        {currentUserId && sortedMessages.length > 0 ? (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Message
                  msg={sortedMessages[virtualRow.index]}
                  currentUserId={currentUserId}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoMessages />
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
