import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

export default function WidgetTab() {
  return (
    <div className="p-3 hidden lg:flex flex-col space-y-4 w-[400px] ps-10">
      {/* Search bar */}
      <div
        className="bg-gray-100 text-gray-600 h-[44px] flex 
      items-center space-x-3 rounded-full pl-5"
      >
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search OrangeSky"
          className="bg-transparent outline-none"
        />
      </div>
      {/* Trending section */}
      <div className="bg-gray-100 rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">What's happening</h1>
        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-gray-600 text-xs">240K Posts</span>
        </div>
        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#NextJS</span>
          <span className="text-gray-600 text-xs">240K Posts</span>
        </div>
        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#TailwindJS</span>
          <span className="text-gray-600 text-xs">240K Posts</span>
        </div>
        <div className="flex flex-col py-3 space-y-0.53">
          <div className="flex justify-between text-gray-600 text-xs">
            <span>Trending in Australia</span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#Firebase</span>
          <span className="text-gray-600 text-xs">240K Posts</span>
        </div>
      </div>
      {/* Who to follow section */}
      <div className="bg-gray-100 rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Who to follow</h1>
        <div className="flex justify-between items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/profile-pic.jpg"}
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold">John Doe</span>
              <span className="text-gray-600 text-xs">@johndoe</span>
            </div>
          </div>
          <button
            className="bg-gray-900 text-white w-[72px] h-[40px] rounded-full 
          text-sm"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
