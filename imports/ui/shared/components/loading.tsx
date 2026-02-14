import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
