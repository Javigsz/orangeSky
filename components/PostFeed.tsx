"use client";

import React, { useEffect, useState } from "react";
import Post from "./Post";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";

interface PostFeedProps {
  username?: string;
  likes?: string;
}

export default function PostFeed({ username, likes }: PostFeedProps) {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let postsQuery;

    if (username) {
      postsQuery = query(
        collection(db, "post"),
        where("username", "==", username),
        orderBy("timestamp", "desc")
      );
    } else if (likes) {
      postsQuery = query(
        collection(db, "post"),
        where("likes", "array-contains", likes),
        orderBy("timestamp", "desc")
      );
    } else {
      postsQuery = query(collection(db, "post"), orderBy("timestamp", "desc"));
    }

    let loaded = false;
    const timeout = setTimeout(() => {
      if (!loaded) {
        dispatch(closeLoadingScreen());
      }
    }, 3000);

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      loaded = true;
      clearTimeout(timeout);
      setPosts(snapshot.docs);
      dispatch(closeLoadingScreen());
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} data={post.data()} id={post.id} />
      ))}
    </>
  );
}
