import React from "react";
import { ChatBubbleIcon } from "../../../shared/icons";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center px-4 bg-gradient-to-br from-gray-900 via-dracula-bg to-gray-800">
      <div className="animate-fade-in-up">
        <div className="p-8 rounded-3xl glass-strong shadow-premium-lg border border-primary-500/20 hover:border-primary-500/40 transition-all duration-500 max-w-sm">
          {/* Animated icon background */}
          <div className="mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-pulse" 
                   style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></div>
              <div className="absolute inset-2 rounded-full border border-dracula-pink/20" 
                   style={{ animation: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></div>
              
              {/* Icon container */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-dracula-pink/20 backdrop-blur-sm border border-primary-500/30 hover-scale hover:shadow-glow transition-all duration-300">
                <ChatBubbleIcon size={48} className="text-primary-500 animate-float" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-dracula-pink mb-3 leading-tight">
            Select a chat to start messaging
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Choose a conversation from your contacts or create a new one to begin chatting with friends.
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-primary-500/40 animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 rounded-full bg-dracula-pink/40 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary-500/40 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>

        {/* Subtle hint text */}
        <p className="text-xs text-gray-500 mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          💡 Select a user from the sidebar to start
        </p>
      </div>
    </div>
  );
};
