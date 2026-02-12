import React from "react";

const RoomHeader: React.FC = () => {
  return (
    <header className="p-3 bg-white border-b flex justify-between items-center">
      <h1 className="text-xl font-bold m-0">Chats</h1>

      <div className="flex gap-2">
        <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition">
          Video Call
        </button>

        <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md text-sm hover:bg-blue-50 transition">
          Audio Call
        </button>
      </div>
    </header>
  );
};

export default RoomHeader;
