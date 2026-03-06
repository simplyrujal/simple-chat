# Implementing "User is Typing" Indicator in Meteor.js + React

## Overview

This guide walks you through implementing a real-time typing indicator in a Meteor.js + React chat application. When one user types, the other user sees a live "is typing..." indicator.

### How It Works

Meteor's reactive publish/subscribe system handles all real-time sync automatically — no manual WebSocket plumbing needed.

1. User starts typing → write to a `Typing` collection in MongoDB
2. Other user subscribes to that collection → sees the update reactively
3. User stops typing → record is removed (via debounce)

---

## Step 1 — Create the Typing Collection

```js
// lib/collections/typing.js
export const Typing = new Mongo.Collection("typing");
```

---

## Step 2 — Define Meteor Methods (Server)

```js
// server/methods/typing.js
import { Typing } from "/lib/collections/typing";

Meteor.methods({
  "typing.start"({ chatId }) {
    const userId = this.userId;
    if (!userId) throw new Meteor.Error("not-authorized");

    // Upsert so we don't create duplicates
    Typing.upsert(
      { userId, chatId },
      { $set: { userId, chatId, updatedAt: new Date() } },
    );
  },

  "typing.stop"({ chatId }) {
    const userId = this.userId;
    if (!userId) throw new Meteor.Error("not-authorized");

    Typing.remove({ userId, chatId });
  },
});
```

---

## Step 3 — Publish the Typing Collection (Server)

```js
// server/publications/typing.js
import { Typing } from "/lib/collections/typing";

Meteor.publish("typing", function ({ chatId }) {
  if (!this.userId) return this.ready();

  // Publish everyone typing in this chat EXCEPT the current user
  return Typing.find({
    chatId,
    userId: { $ne: this.userId },
  });
});
```

---

## Step 4 — Auto-cleanup Stale Typing Records (Server)

In case the client disconnects without calling `typing.stop`:

```js
// server/startup/typingCleanup.js
import { Typing } from "/lib/collections/typing";

Meteor.startup(() => {
  // Remove typing records older than 5 seconds every 3 seconds
  Meteor.setInterval(() => {
    const staleTime = new Date(Date.now() - 5000);
    Typing.remove({ updatedAt: { $lt: staleTime } });
  }, 3000);
});
```

---

## Step 5 — React Hook for Typing Logic

```js
// client/hooks/useTypingIndicator.js
import { useState, useCallback, useRef } from "react";
import { Meteor } from "meteor/meteor";

export function useTypingIndicator(chatId) {
  const [isTyping, setIsTyping] = useState(false);
  const stopTimerRef = useRef(null);

  const handleTyping = useCallback(() => {
    // Start typing if not already marked
    if (!isTyping) {
      setIsTyping(true);
      Meteor.call("typing.start", { chatId });
    }

    // Reset the stop timer on every keystroke
    clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      setIsTyping(false);
      Meteor.call("typing.stop", { chatId });
    }, 2000); // Stop after 2s of inactivity
  }, [chatId, isTyping]);

  const stopTyping = useCallback(() => {
    clearTimeout(stopTimerRef.current);
    if (isTyping) {
      setIsTyping(false);
      Meteor.call("typing.stop", { chatId });
    }
  }, [chatId, isTyping]);

  return { handleTyping, stopTyping };
}
```

---

## Step 6 — Typing Indicator Display Component

```jsx
// client/components/TypingIndicator.jsx
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useSubscribe } from "meteor/react-meteor-data";
import { Typing } from "/lib/collections/typing";

export function TypingIndicator({ chatId }) {
  const isLoading = useSubscribe("typing", { chatId });

  const typingUsers = useTracker(() => {
    // Join with Meteor.users to get usernames
    const records = Typing.find({ chatId }).fetch();
    return records.map((record) => {
      const user = Meteor.users.findOne(record.userId);
      return user?.username || user?.profile?.name || "Someone";
    });
  }, [chatId]);

  if (isLoading() || typingUsers.length === 0) return null;

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
}
```

---

## Step 7 — Wire It Into Your Chat Component

```jsx
// client/components/ChatBox.jsx
import React, { useState } from "react";
import { useTypingIndicator } from "../hooks/useTypingIndicator";
import { TypingIndicator } from "./TypingIndicator";

export function ChatBox({ chatId }) {
  const [message, setMessage] = useState("");
  const { handleTyping, stopTyping } = useTypingIndicator(chatId);

  const handleChange = (e) => {
    setMessage(e.target.value);
    handleTyping(); // Trigger typing indicator
  };

  const handleSend = () => {
    if (!message.trim()) return;
    stopTyping(); // Clear indicator on send
    Meteor.call("messages.send", { chatId, text: message });
    setMessage("");
  };

  return (
    <div>
      {/* Place above the input field */}
      <TypingIndicator chatId={chatId} />

      <input
        type="text"
        value={message}
        onChange={handleChange}
        onBlur={stopTyping} // Clear if user leaves the field
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
```

---

## Step 8 — Animated Typing Dots (CSS)

```css
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  font-size: 12px;
  color: #888;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background: #aaa;
  border-radius: 50%;
  animation: bounce 1.2s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}
```

---

## Data Flow Summary

```
User types keystroke
  → handleTyping() fires
    → Meteor.call('typing.start')
      → Typing collection updated in MongoDB
        → Subscription pushes update to other client
          → useTracker re-renders TypingIndicator reactively

User stops typing (2s debounce / onBlur / sends message)
  → Meteor.call('typing.stop')
    → Record removed → indicator disappears
```

---

## File Structure Reference

```
/lib
  /collections
    typing.js             ← Shared Mongo collection

/server
  /methods
    typing.js             ← typing.start / typing.stop methods
  /publications
    typing.js             ← Publish typing records
  /startup
    typingCleanup.js      ← Auto-remove stale records

/client
  /hooks
    useTypingIndicator.js ← Typing state + debounce logic
  /components
    TypingIndicator.jsx   ← Reactive display component
    ChatBox.jsx           ← Wire everything together
```
