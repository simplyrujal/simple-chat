import React, { useEffect, useState } from "react";

// Dynamically resolve the signaling server URL based on the current host.
// This ensures it works whether you're on localhost OR accessing from another PC via IP.
const getSignalingUrl = (): string => {
  if (typeof window === "undefined") return "ws://localhost:8080";
  const host = window.location.hostname; // e.g. "localhost" or "192.168.1.x"
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${host}:8080`;
};

const SIGNALING_URL = getSignalingUrl();

interface SignalingStatus {
  connected: boolean;
  error: string | null;
}

export const SignalingTest: React.FC = () => {
  const [status, setStatus] = useState<SignalingStatus>({
    connected: false,
    error: null,
  });
  const [testMessage, setTestMessage] = useState<string | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
      try {
        ws = new WebSocket(SIGNALING_URL);

        ws.onopen = () => {
          setStatus({ connected: true, error: null });

          // Register as test user
          ws?.send(
            JSON.stringify({
              type: "register",
              userId: "test-user-" + Math.random().toString(36).substr(2, 9),
            }),
          );
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            setTestMessage(JSON.stringify(message, null, 2));
          } catch (e) {
            console.error("Failed to parse message:", e);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error connecting to:", SIGNALING_URL, error);
          setStatus({
            connected: false,
            error: `Connection error to ${SIGNALING_URL}`,
          });
        };

        ws.onclose = () => {
          console.log("Signaling server disconnected from:", SIGNALING_URL);
          setStatus({ connected: false, error: "Disconnected" });

          // Attempt to reconnect after 3 seconds
          reconnectTimeout = setTimeout(() => {
            if (ws?.readyState === WebSocket.CLOSED) {
              connect();
            }
          }, 3000);
        };
      } catch (error) {
        setStatus({ connected: false, error: "Failed to connect" });
      }
    };

    connect();

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Signaling Server Test</h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span
            className={`px-2 py-1 rounded text-sm ${status.connected
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
          >
            {status.connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {status.error && (
          <div className="text-red-600 dark:text-red-400 text-sm">
            Error: {status.error}
          </div>
        )}

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Server: {SIGNALING_URL}
        </div>

        {testMessage && (
          <div className="mt-4">
            <span className="font-medium">Last Message:</span>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-auto max-h-40">
              {testMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
