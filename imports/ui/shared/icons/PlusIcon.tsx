import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({
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
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
