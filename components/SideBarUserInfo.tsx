"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { closeLogInModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import { Popover } from "@mui/material";

export default function SideBarUserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignUpModal());
    dispatch(closeLogInModal());
  };

  return (
    <>
      <div
        className="absolute bottom-3 flex items-center space-x-2 hover:bg-gray-600 hover:bg-opacity-10
        xl:p-3 xl:pe-6 rounded-full cursor-pointer transition w-fit xl:w-[240px] justify-start"
        // onClick={() => router.push("/profile/" + user.uid)}
        onClick={(e) => {
          e.stopPropagation();
          setAnchor(e.currentTarget);
          setOpen(true);
        }}
      >
        <Image
          src={"/profile-pic.jpg"}
          width={36}
          height={36}
          alt="Profile Picture"
          className="w-9 h-9 rounded-full cursor-pointer"
        />
        <div className="flex-col hidden xl:flex text-sm">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {user.name}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
            {user.username}
          </span>
        </div>
      </div>
      <Popover
        id="mouse-over-popover"
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => {
          if (anchor && anchor.contains(document.activeElement)) {
            (document.activeElement as HTMLElement).blur();
          }
          setAnchor(null);
          setOpen(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="flex flex-col w-full p-0.5 rounded-md">
          <div
            className="hover:bg-gray-300 cursor-pointer px-6 py-2 font-bold rounded-md"
            onClick={() => {
              router.push("/profile/" + user.uid);
              setAnchor(null);
              setOpen(false);
            }}
          >
            Go to profile
          </div>
          <div className="w-full h-[1px] bg-gray-300 "></div>
          <div
            className="hover:bg-red-500 hover:text-white cursor-pointer px-6 py-2 font-bold rounded-md"
            onClick={() => {
              handleSignOut();
              setAnchor(null);
              setOpen(false);
            }}
          >
            Log Out
          </div>
        </div>
      </Popover>
    </>
  );
}
