"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  openCommentModal,
  openLogInModal,
  setCommentDetails,
} from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

interface PostProps {
  data: DocumentData;
  id: string;
}

export async function getUidByUsername(
  username: string
): Promise<string | null> {
  const usersRef = collection(db, "user");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null; // No user found

  // Assuming usernames are unique, take the first match
  return snapshot.docs[0].id; // This is the UID
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const route = useRouter();

  const likePost = async () => {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }

    const postRef = doc(db, "post", id);

    if (data.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  };

  return (
    <div
      className="border-b border-gray-200 cursor-pointer"
      onClick={() => route.push(`/post/${id}`)}
    >
      <PostHeader
        username={data.username}
        name={data.name}
        text={data.text}
        timestamp={data.timestamp}
      />
      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] cursor-pointer hover:text-button transition"
            onClick={(e) => {
              e.stopPropagation();
              if (!user.username) {
                dispatch(openLogInModal());
                return;
              }
              dispatch(openCommentModal());
              dispatch(
                setCommentDetails({
                  name: data.name,
                  username: data.username,
                  id: id,
                  text: data.text,
                })
              );
            }}
          />
          {data.comments.length > 0 && (
            <span className="absolute text-xs top-1 -right-3 cursor-default">
              {data.comments.length}
            </span>
          )}
        </div>
        <div className="relative">
          {data.likes.includes(user.uid) ? (
            <HeartIconSolid
              className="w-[22px] h-[22px] cursor-pointer text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-button transition"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3 cursor-default">
              {data.likes.length}
            </span>
          )}
        </div>
        <div className="relative">
          <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
          <span className="absolute text-xs top-1 -right-3 cursor-default">
            2
          </span>
        </div>
        <div className="relative">
          <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
          <span className="absolute text-xs top-1 -right-3 cursor-default">
            1
          </span>
        </div>
      </div>
    </div>
  );
}

interface PostHeaderProprs {
  username: string;
  name: string;
  text: string;
  timestamp?: Timestamp;
  reply?: string;
}

export function PostHeader({
  username,
  name,
  timestamp,
  text,
  reply,
}: PostHeaderProprs) {
  const router = useRouter();

  const handleProfileClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const uid = await getUidByUsername(username);
    if (uid) {
      router.push("/profile/" + uid);
    }
  };

  return (
    <div className="flex p-3 space-x-5">
      <Image
        src="/profile-pic.jpg"
        width={44}
        height={44}
        alt="Profile picture"
        className="w-12 h-12"
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div
          className="flex space-x-1.5 text-gray-400"
          onClick={handleProfileClick}
        >
          <span
            className="font-bold text-[#0F1419] whitespace-nowrap 
          inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px] overflow-hidden text-ellipsis hover:underline cursor-pointer"
          >
            {name}
          </span>
          <span
            className="whitespace-nowrap 
          inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px] overflow-hidden text-ellipsis
          "
          >
            @{username}
          </span>
          {timestamp && (
            <>
              <span>·</span>
              <Moment fromNow>{timestamp.toDate()}</Moment>
            </>
          )}
        </div>
        <span>{text}</span>
        {reply && (
          <span className="text-[15px] text-gray-500">
            Replying to <span className="text-button">@{reply}</span>
          </span>
        )}
      </div>
    </div>
  );
}
