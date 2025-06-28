'use client'

import React from 'react'
import SignUpModal from './modals/SignUpModal'
import LogInModal from './modals/LogInModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function SignUpPrompt() {
  const name = useSelector((state: RootState) => state.user.username)

  return (
    !name &&
    <div className="fixed w-full h-[80px] bg-button bottom-0 flex justify-center 
      lg:justify-around items-center md:space-x-5"
    >
      <div className="hidden md:flex flex-col text-white">
        <span className="text-xl font-bold">Don't miss out</span>
        <span>Sign up for an account to get the most out of our platform.</span>
      </div>
      <div className="flex space-x-2 w-full md:w-fit p-3">
        <LogInModal />
        <SignUpModal />
      </div>
    </div>
  )
}
