import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AudioIcon: React.FC<IconProps> = ({
  size = 16,
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
      strokeWidth={2}
      d="M11 5L6 9H3v6h3l5 4V5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 9a3 3 0 010 6"
    />
  </svg>
);
