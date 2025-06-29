'use client'

import React, { useEffect, useState } from 'react'
import PostInput from './PostInput'
import Post from './Post'
import { collection, orderBy, query, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from '@/firebase'
import { useDispatch } from 'react-redux'
import { closeLoadingScreen } from '@/redux/slices/loadingSlice'

export default function PostFeed() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    const q = query(collection(db, 'post'), orderBy('timestamp', 'desc'))

    let loaded = false;
    const timeout = setTimeout(() => {
      if (!loaded) {
        dispatch(closeLoadingScreen())
      }
    }, 3000);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      loaded = true;
      clearTimeout(timeout);
      setPosts(snapshot.docs)
      dispatch(closeLoadingScreen())
    })
    
    return () => {
      clearTimeout(timeout)
      unsubscribe()
    }
  }, [])

  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div className="py-4 px-3 text-lg sm:text-xl sticky 
        top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        Home
      </div>
      <PostInput />
      {posts.map((post) => (
        <Post 
          key={post.id} 
          data={post.data()}
          id={post.id}
        />
      ))}
    </div>
  )
}
