"use client";

import ProfileButton from "@/app/profile/[id]/ProfileButton";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface MiniProfileProps {
  username: string;
  name: string;
  profileUser: string;
}

export default function MiniProfile({
  username,
  name,
  profileUser,
}: MiniProfileProps) {
  const userId = useSelector((state: RootState) => state.user.uid); // signed-in user
  const [canMessage, setCanMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkMutualFollow() {
      if (!userId || userId === profileUser) {
        setCanMessage(false);
        return;
      }
      const userDoc = await getDoc(doc(db, "user", userId));
      const profileDoc = await getDoc(doc(db, "user", profileUser));
      const userFollowers: string[] = userDoc.data()?.followers || [];
      const profileFollowers: string[] = profileDoc.data()?.followers || [];
      setCanMessage(
        userFollowers.includes(profileUser) && profileFollowers.includes(userId)
      );
    }
    checkMutualFollow();
  }, [userId, profileUser]);
  return (
    <div className="flex flex-grow justify-between items-center border-b-gray-200 border-b p-2 min-w-[332px]">
      <div className="flex ml-4">
        <Image
          src="/profile-pic.jpg"
          width={44}
          height={44}
          alt="Profile picture"
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col">
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => router.push(`/profile/${profileUser}`)}
          >
            {name}
          </span>
          <span className="text-gray-500">{username}</span>
        </div>
      </div>
      <div className="mr-4 space-x-3">
        {canMessage && (
          <button className="text-button border-button border-2 hover:text-white hover:bg-button transition rounded-full p-2">
            Message
          </button>
        )}
        <ProfileButton />
      </div>
    </div>
  );
}
