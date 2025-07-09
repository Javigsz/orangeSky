"use client";

import { openEditProfileModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

async function isFollowing(currentUserId: string, profileUserId: string) {
  const userDocRef = doc(db, "user", profileUserId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) return false;
  const data = userDocSnap.data();
  return (
    Array.isArray(data.followers) && data.followers.includes(currentUserId)
  );
}

interface ProfileButtonProps {
  miniProfileId?: string;
}

export default function ProfileButton({ miniProfileId }: ProfileButtonProps) {
  const user = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [following, setFollowing] = useState<boolean>(false);
  const route = pathname.split("/")[1];
  const profileUserId = pathname.split("/")[2];
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (
      user.uid &&
      pathname.split("/")[2] &&
      user.uid !== pathname.split("/")[2]
    ) {
      isFollowing(user.uid, profileUserId).then(setFollowing);
    }
  }, [user.uid, pathname.split("/")[2]]);

  const handleFollow = async () => {
    if (!user.uid || !profileUserId) return;
    await updateDoc(doc(db, "user", profileUserId), {
      followers: arrayUnion(user.uid),
    });
    setFollowing(true);
  };

  const handleUnfollow = async () => {
    if (!user.uid || !profileUserId) return;
    await updateDoc(doc(db, "user", profileUserId), {
      followers: arrayRemove(user.uid),
    });
    setFollowing(false);
  };

  return (
    <>
      {route === "profile" && profileUserId === user.uid && (
        <button
          className="rounded-full w-[100px]
        text-button text-sm border-2 border-button hover:shadow-md p-2 px-4 h-12 z-10 transition"
          onClick={() => dispatch(openEditProfileModal())}
        >
          Edit
        </button>
      )}
      {route === "profile" &&
        user.uid !== profileUserId &&
        (following ? (
          <button
            className="rounded-full w-[100px]
              text-white bg-button hover:bg-red-500 hover:border-red-500 text-sm border-2 h-12
              border-button hover:shadow-md p-2 px-4 z-10 transition"
            onClick={handleUnfollow}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? "Unfollow" : "Following"}
          </button>
        ) : (
          <button
            className="rounded-full w-[100px]
            text-button text-sm border-2 border-button hover:shadow-md h-12 p-2 px-4 z-10 transition"
            onClick={handleFollow}
          >
            Follow
          </button>
        ))}
      {route === "followers" && miniProfileId === user.uid && (
        <button
          className="rounded-full w-[100px]
          text-button text-sm border-2 border-button hover:shadow-md p-2 px-4 h-12 z-10 transition"
          onClick={() => dispatch(openEditProfileModal())}
        >
          Edit
        </button>
      )}
      {route === "followers" &&
        miniProfileId !== user.uid &&
        (!following ? (
          <button
            className="rounded-full w-[100px]
            text-white bg-button hover:bg-red-500 hover:border-red-500 text-sm border-2 h-12
            border-button hover:shadow-md p-2 px-4 z-10 transition"
            onClick={handleUnfollow}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? "Unfollow" : "Following"}
          </button>
        ) : (
          <button
            className="rounded-full w-[100px]
          text-button text-sm border-2 border-button hover:shadow-md h-12 p-2 px-4 z-10 transition"
            onClick={handleFollow}
          >
            Follow
          </button>
        ))}
    </>
  );
}
