import React from "react";
import { SignalingTest } from "../../../shared/components/signaling-test";

const Info: React.FC = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Admin Info</h1>
    <div className="mb-6">
      <SignalingTest />
    </div>
  </div>
);
export default Info;
