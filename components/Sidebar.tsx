"use client";

import React from "react";
import Image from "next/image";
import {
  HomeIcon,
  UserIcon,
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  InboxIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import SideBarUserInfo from "./SideBarUserInfo";
import SidebarLink from "./SidebarLink";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20 xl:mr-10">
      <div className="relative h-full flex flex-col">
        <div className="py-3">
          <Image
            src={"/logo.jpg"}
            width={48}
            height={48}
            alt="Logo"
            unoptimized={true}
            className="w-12 h-12 z-10"
          />
        </div>
        <ul>
          <SidebarLink text="Home" Icon={HomeIcon} path={"/"} />
          <SidebarLink text="Explore" Icon={HashtagIcon} path={"/explore"} />
          <SidebarLink
            text="Notifications"
            Icon={BellIcon}
            path={"/notifications"}
          />
          <SidebarLink text="Messages" Icon={InboxIcon} path={"/messages"} />
          <SidebarLink
            text="Bookmarks"
            Icon={BookmarkIcon}
            path={"/bookmarks"}
          />
          <SidebarLink
            text="Profile"
            Icon={UserIcon}
            path={"/profile/" + user.uid}
            loggedIn={true}
          />
          <SidebarLink
            text="More"
            Icon={EllipsisHorizontalCircleIcon}
            path={"/more"}
          />
          <button
            className="hidden xl:block bg-button  w-[200px] h-[52px] rounded-full text-white
            cursor-pointer font-medium shadow-md mt-2"
          >
            Post
          </button>
        </ul>
        <SideBarUserInfo />
      </div>
    </nav>
  );
}
