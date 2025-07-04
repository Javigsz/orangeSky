import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import React from "react";
import MiniProfile from "@/components/MiniProfile";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  params: { id: string };
}

export default async function UserFollowers({ params }: Props) {
  // 1. Get the profile user's document
  const userDocRef = doc(db, "user", params.id);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    return (
      <div className="flex-grow max-w-2xl border-x border-gray-200">
        <h1>User not found.</h1>
      </div>
    );
  }

  // 2. Get the followers array (array of UIDs)
  const data = userDocSnap.data();
  const username = data.username;
  const followersArray: string[] = data.followers || [];

  // if (followersArray.length === 0) {
  //   return (
  //     <div className="flex-grow max-w-2xl border-x border-gray-200">
  //       <h1>No followers found.</h1>
  //     </div>
  //   );
  // }

  // 3. Query all users whose UID is in followersArray (max 10 per query)
  // Firestore 'in' operator supports up to 10 values per query
  const chunks = [];
  for (let i = 0; i < followersArray.length; i += 10) {
    chunks.push(followersArray.slice(i, i + 10));
  }

  let allFollowers: any[] = [];
  for (const chunk of chunks) {
    const q = query(collection(db, "user"), where("__name__", "in", chunk));
    const snap = await getDocs(q);
    allFollowers = allFollowers.concat(
      snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  }

  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div
        className="py-4 px-3 text-lg sm:text-xl sticky 
            top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b
            flex justify-between border-gray-200"
      >
        <div className="flex items-center">
          <Link href="/">
            <ArrowLeftIcon className="w-5 h-5 mr-5 cursor-pointer" />
          </Link>
          <h2>Followers: {allFollowers.length}</h2>
        </div>
        <h2>@{username}</h2>
      </div>
      <div className="font-bold flex items-end text-xl p-5 h-40 bg-button text-white border-b-gray-200 border-b">
        {/* <h2>Followers of {data.name}</h2> */}
      </div>
      {allFollowers.length === 0 ? (
        <div className="flex-grow max-w-2xl border-x border-gray-200">
          <h1 className="m-5">No followers found.</h1>
        </div>
      ) : (
        <ul>
          {allFollowers.map((follower) => (
            <li key={follower.id}>
              <MiniProfile
                username={follower.username}
                name={follower.name}
                profileUser={follower.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
