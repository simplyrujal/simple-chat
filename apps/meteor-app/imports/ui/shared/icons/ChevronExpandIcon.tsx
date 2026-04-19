import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

interface ChevronExpandIconProps extends IconProps {
  direction?: "left" | "right";
}

export const ChevronExpandIcon: React.FC<ChevronExpandIconProps> = ({
  size = 20,
  className = "",
  direction = "left",
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {direction === "right" ? (
      <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
    ) : (
      <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
    )}
  </svg>
);
