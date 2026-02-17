import React from "react";

interface TextMessageProps {
  text?: string;
}

export const TextMessage: React.FC<TextMessageProps> = ({ text }) => {
  return (
    <p className="text-sm leading-relaxed wrap-break-words whitespace-pre-wrap">
      {text}
    </p>
  );
};
