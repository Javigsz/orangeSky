import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default function Messages({ params }: { params: { id: string } }) {
  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky 
            top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        Messages
      </div>
      <p className="text-sm m-5">
        Do you want to start a new conversation? Press the button below and
        select an user. You can only start a conversation with people you follow
        and people who follow you as well.
      </p>
      <Link href={"/followers/" + params.id}>
        <button className="flex items-center bg-button text-white h-[48px] rounded-full p-4 ml-4 mb-6 hover:shadow-lg transition">
          <EnvelopeIcon className="w-8 h-8" />
        </button>
      </Link>
      <div className="border-t border-gray-200"></div>
    </div>
  );
}
