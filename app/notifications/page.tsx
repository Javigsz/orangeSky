import React from "react";

export default function Notifications() {
  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky 
            top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        Notifications
      </div>
      <p className=" text-sm m-5">Nothing to see here yet.</p>
    </div>
  );
}
