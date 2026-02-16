import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ChatBubbleIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z"
    />
  </svg>
);
