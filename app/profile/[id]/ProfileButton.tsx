'use client'

import { openEditProfileModal } from '@/redux/slices/modalSlice'
import { RootState } from '@/redux/store'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function ProfileButton() {
  const user = useSelector((state: RootState) => state.user)
  const pathname = usePathname()
  const dispatch = useDispatch()

  return (
    <>
      {user.uid === pathname.split('/')[2] ? (
        <button 
          className="right-16 top-48 -translate-y-1/2 absolute rounded-full 
          text-button text-sm border-2 border-button hover:shadow-md p-2 px-4 z-10 transition"
          onClick={() => dispatch(openEditProfileModal())}
        >
          Edit
        </button>
      ) : (
        <button 
          className="right-16 top-48 -translate-y-1/2 absolute rounded-full 
          text-button text-sm border-2 border-button hover:shadow-md p-2 px-4 z-10 transition"
        >
          Follow
        </button>
      )}
    </>
  )
}
