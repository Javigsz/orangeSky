'use client'

import { closeCommentModal, closeLogInModal } from '@/redux/slices/modalSlice'
import { RootState } from '@/redux/store'
import { Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostHeader } from '../Post'
import PostInput from '../PostInput'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { comment } from 'postcss'

export default function CommentModal() {

  const open = useSelector((state: RootState) => state.modals.commentModalOpen)
  const commentPostDetails = useSelector((state: RootState) => state.modals.commentPostDetails)
  const dispatch = useDispatch()

  return (
    <>
      <Modal
        open={open} // Replace with your state management logic
        onClose={() => dispatch(closeCommentModal())} // Replace with your close handler
        className="flex justify-center items-center"
      >
        <div 
          className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none relative"
        >
          <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={() => dispatch(closeCommentModal())} />
          <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
            <PostHeader
              username={commentPostDetails.username}
              name={commentPostDetails.name}
              text={commentPostDetails.text}
              reply={commentPostDetails.username}
            />
            <div className="mt-4" >
              <PostInput 
                insideModal={true} // Pass a prop to indicate this is inside a modal
              />
            </div>
            <div className="absolute w-0.5 h-32 bg-gray-300 left-[35px] sm:left-[55px] top-24" />
          </div>
        </div>
      </Modal>
    </>
  )
}
