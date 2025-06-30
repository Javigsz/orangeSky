'use client'

import Post from '@/components/Post'
import { db } from '@/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import React from 'react'

export default async function userProfileLikes({ params }: { params: { id: string } }) {

  // 2. Query posts by username
  const userId = params.id
  const postsRef = collection(db, "post")
  const postsQuery = query(
    postsRef,
    where("likes", "array-contains", userId),
    orderBy("timestamp", "desc")
  )
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