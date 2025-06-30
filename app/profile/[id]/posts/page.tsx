'use client'

import Post from '@/components/Post'
import { db } from '@/firebase'
import { collection, getDocs, query, where, doc, getDoc, orderBy } from 'firebase/firestore'
import React from 'react'

export default async function userProfilePosts({ params }: { params: { id: string } }) {
  // 1. Get the user document by UID
  const userDocRef = doc(db, "user", params.id)
  const userDocSnap = await getDoc(userDocRef)
  if (!userDocSnap.exists()) {
    return <div>User not found</div>
  }
  const userData = userDocSnap.data()
  const username = userData.username

  // 2. Query posts by username
  const postsRef = collection(db, "post")
  const postsQuery = query(postsRef, where("username", "==", username), orderBy("timestamp", "desc"))
  const postsSnap = await getDocs(postsQuery)
  const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return (
    <>
      {posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        <ul>
          {posts.map(post => (
            <Post id={post.id} key={post.id} data={post} />
          ))}
        </ul>
      )}
    </>
  )
}