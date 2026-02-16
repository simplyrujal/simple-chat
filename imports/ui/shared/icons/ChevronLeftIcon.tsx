import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ChevronLeftIcon: React.FC<IconProps> = ({
  size = 20,
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
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
