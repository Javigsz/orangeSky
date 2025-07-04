import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function Explore() {
  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky 
            top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        Explore
      </div>
      <div
        className="bg-gray-100 text-gray-600 h-[44px] flex 
      items-center space-x-3 rounded-full pl-5 m-5"
      >
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search OrangeSky"
          className="bg-transparent outline-none"
        />
      </div>
      <div className="rounded-xl p-3">
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
          <span className="font-bold text-sm">#Tailwind</span>
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
    </div>
  );
}
