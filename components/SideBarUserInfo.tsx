'use client'

import React from 'react'
import Image from 'next/image'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser } from '@/redux/slices/userSlice'
import { RootState } from '@/redux/store'
import { closeLogInModal, closeSignUpModal } from '@/redux/slices/modalSlice'

export default function SideBarUserInfo() {

  const dispatch = useDispatch()
  const user = useSelector((state : RootState) => state.user)

  const handleSignOut = async () => {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(closeSignUpModal())
    dispatch(closeLogInModal())
  }

  return (
      <div className="absolute bottom-3 flex items-center space-x-2 hover:bg-gray-600 hover:bg-opacity-10
        xl:p-3 xl:pe-6 rounded-full cursor-pointer transition w-fit xl:w-[240px] justify-start"
        onClick={handleSignOut}
      >
        <Image 
          src={'/profile-pic.jpg'} width={36} height={36} alt="Profile Picture" className="w-9 h-9 rounded-full cursor-pointer"   
        />
        <div className="flex-col hidden xl:flex text-sm">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">{user.name}</span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">{user.username}</span>
        </div>
      </div>
  )
}
