'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CalendarIcon, ChartBarIcon, FaceSmileIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { db } from '@/firebase'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { closeCommentModal, openLogInModal } from '@/redux/slices/modalSlice'
import { RootState } from '@/redux/store'

interface PostInputProps {
  insideModal?: boolean
}

export default function PostInput( { insideModal }: PostInputProps ) {
  const [postContent, setPostContent] = useState('')
  const user = useSelector((state: RootState) => state.user)
  const commentPostDetails = useSelector((state: RootState) => state.modals.commentPostDetails)
  const dispatch = useDispatch()

  const sentPost = async () => {

    if(!user.username){
      dispatch(openLogInModal())
      return
    }
    await addDoc(collection(db, 'post'), {
      text: postContent,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: []
    })
    setPostContent('')
  }

  const sendComment = async () => {
    const postRef = doc(db, 'post', commentPostDetails.id)

    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: postContent,
      })
    })

    setPostContent('')
    dispatch(closeCommentModal())
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-200">
      <Image 
        src={insideModal ? '/profile-pic.jpg' : '/logo.jpg'} 
        width={44} height={44} 
        alt={insideModal ? 'Profile Picture' : 'Logo'} 
        className="w-12 h-12 z-10" 
        unoptimized={true}
      />
      <div className="w-full">
        <textarea 
          className="resize-none outline-none w-full min-h-[50px] text-lg" 
          placeholder={insideModal ? 'Write a reply' : 'What\'s happening?'}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <div className="flex justify-between pt-5 border-t border-gray-100">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-button" />
            <ChartBarIcon className="w-[22px] h-[22px] text-button" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-button" />
            <CalendarIcon className="w-[22px] h-[22px] text-button" />
            <MapPinIcon className="w-[22px] h-[22px] text-button" />
          </div>
          <button 
            className="bg-button text-white w-[80px] h-[36px] rounded-full
            text-sm cursor-pointer disabled:bg-opacity-70"
            onClick={!insideModal ? sentPost : sendComment}
            disabled={!postContent.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
