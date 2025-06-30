"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice'
import { signInUser, signOutUser } from '@/redux/slices/userSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'

export default function SignUpModal() {

  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen)
  const dispatch: AppDispatch = useDispatch()

  const handleSignUp = async () => {

    if(!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Check for existing email
    const usersRef = collection(db, "users")
    const emailQuery = query(usersRef, where("email", "==", email))
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      setError("Email already exists!")
      return
    }

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(userCredentials.user, {
      displayName: name
    })

    await setDoc(doc(db, 'user', userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      name: userCredentials.user.displayName,
      username: userCredentials.user.email!.split('@')[0] || '',
      email: userCredentials.user.email!,
      createdAt: new Date(),
      description: 'Hi, I\'m a new user!'
    })

    dispatch(signInUser({ 
      uid: userCredentials.user.uid,
      name: userCredentials.user.displayName,
      username: userCredentials.user.email!.split('@')[0] || '',
      email: userCredentials.user.email!,
      })
    )

    setError(null)
  }

  const handleGuestLogin = async () => {
    await signInWithEmailAndPassword(
      auth,
      "guest1234@me.com",
      "guest1234"
    )
  }

  const handleCloseModal = () => {
    setError(null)
    setName('')
    setEmail('')
    setPassword('')
    dispatch(closeSignUpModal())
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(!user) return

      dispatch(signInUser(
        {
          name: user.displayName!,
          username: user.email!.split('@')[0] || '',
          email: user.email! || '',
          uid: user.uid!,
        }
      ))
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <button
        className="w-full px-4 md:px-0 h-[48px] md:w-[88px] md:h-[40px] md:text-sm text-md font-bold 
        bg-white rounded-full"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>

      <Modal open={isOpen} onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white outline-none sm:rounded">
          <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={handleCloseModal} />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-3 rounded-[4px]
                focus:border-button transition"
              />
              <input
                required
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
                  required
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
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}   
              <button 
                className="bg-button text-white h-[48px] rounded-full shadow-md mb-5 w-full"
                onClick={handleSignUp}
              >
                Sign Up
              </button>          
            </div>
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
