import React from "react";
import { Link } from "react-router-dom";
import { WarningIcon } from "../../../../../shared/icons";

const ErrorRoom: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-4" style={{ backgroundColor: "rgba(26, 27, 38, 0.95)" }}>
      <div className="text-center max-w-md mx-auto p-8 rounded-2xl" style={{ backgroundColor: "rgba(40, 42, 54, 0.8)", border: "1px solid rgba(189, 147, 249, 0.15)" }}>
        <div className="mb-4 flex justify-center">
          <WarningIcon size={64} className="text-dracula-orange" />
        </div>

        <h3 className="text-xl font-bold text-gray-100 mb-2">
          Room Not Available
        </h3>

        <p className="mb-6" style={{ color: "#6272a4" }}>
          The chat room you are looking for does not exist or you don&apos;t
          have access to it.
        </p>

        <Link
          to="/dashboard"
          className="inline-block px-6 py-2.5 font-semibold rounded-lg transition-colors bg-gradient-to-r from-primary-500 to-dracula-pink text-gray-900 hover:shadow-lg hover:shadow-primary-500/30"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorRoom;
