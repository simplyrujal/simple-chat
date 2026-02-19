import React from "react";
import { Link } from "react-router-dom";
import { WarningIcon } from "../../../../../shared/icons";

const ErrorRoom: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-4 flex justify-center">
          <WarningIcon size={64} className="text-gray-400" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Room Not Available
        </h3>

        <p className="text-gray-500 mb-6">
          The chat room you are looking for does not exist or you don&apos;t
          have access to it.
        </p>

        <Link
          to="/dashboard"
          className="inline-block px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorRoom;
