import React from "react";

export default function More() {
  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky 
        top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        More
      </div>
      <div className="flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-md font-bold">About</h2>
          <p className="text-sm text-gray-500">
            OrangeSky is a web social media application similar to twitter. It
            allows you to create a profile, post and like tweets and interact
            with other users. Developed by Javigsz. Source code available on
            &nbsp;
            <span>
              <a
                href="https://github.com/javigsz/orangeSky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-button hover:underline"
              >
                GitHub
              </a>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
