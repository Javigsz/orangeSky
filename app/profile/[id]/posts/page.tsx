import PostFeed from "@/components/PostFeed";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

export default async function userProfilePosts({
  params,
}: {
  params: { id: string };
}) {
  const userDocRef = doc(db, "user", params.id);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    return <div>User not found</div>;
  }
  const userData = userDocSnap.data();
  const username = userData.username;

  return (
    <>
      <PostFeed username={username} />
    </>
  );
}
