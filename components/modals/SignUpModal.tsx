"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice'
import { signInUser, signOutUser } from '@/redux/slices/userSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'

export default function SignUpModal() {

  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen)
  const dispatch: AppDispatch = useDispatch()

  const handleSignUp = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await updateProfile(userCredentials.user, {
      displayName: name
    })
    dispatch(signInUser(
      {
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split('@')[0] || '',
        email: userCredentials.user.email! || '',
        uid: userCredentials.user.uid!
      }
    ))
  }

  const handleGuestLogin = async () => {
    await signInWithEmailAndPassword(
      auth,
      "guest1234@me.com",
      "guest1234"
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(!user) return

      dispatch(signInUser(
        {
          name: user.displayName!,
          username: user.email!.split('@')[0] || '',
          email: user.email! || '',
          uid: user.uid!
        }
      ))
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <button
        className="w-full h-[48px] md:w-[88px] md:h-[40px] md:text-sm text-md font-bold 
        bg-white rounded-full"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>

      <Modal open={isOpen} onClose={() => dispatch(closeSignUpModal())}
        className="flex items-center justify-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white outline-none sm:rounded">
          <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={() => dispatch(closeSignUpModal())} />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-3 rounded-[4px]
                focus:border-button transition"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-3 rounded-[4px]
                focus:border-button transition"
              />
              <div className="w-full h-[54px] border-2 border-gray-200 rounded-[4px]
                  focus-within:border-button transition flex items-center overflow-hidden pr-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full ps-3 outline-none "
                />
                <div 
                  className="w-7 h-7 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon /> }
                </div>
              </div>             
            </div>
            <button 
              className="bg-button text-white h-[48px] rounded-full shadow-md mb-5 w-full"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button 
              className="bg-button text-white h-[48px] rounded-full shadow-md mb-5 w-full"
              onClick={handleGuestLogin}
            >
              Log in as Guest
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
