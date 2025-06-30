import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image'
import React from 'react'
// import ProfileNav from './ProfileNav';
import ProfileButton from './ProfileButton';
import EditProfileModal from '@/components/modals/EditProfileModal';
import ProfileNav from './ProfileNav';

async function getUserInfo(uid: string) {
  const userDocRef = doc(db, "user", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data(); // user info object
  } else {
    return null; // user not found
  }
}

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }    
}) {
    const userInfo = await getUserInfo(params.id)
  return (
    <div className="flex-grow max-w-2xl border-x border-gray-200">
      <div className="py-4 px-3 text-lg sm:text-xl sticky 
        top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200"
      >
        Profile
      </div>
      <div className="relative">
        <div className="h-40 bg-button border-b border-gray-200">
        </div>
        <div className="">
          <Image 
            src="/profile-pic.jpg" 
            width={70} height={70} 
            alt="Logo" 
            className="left-4 top-40 -translate-y-1/2 rounded-full absolute w-20 h-20 z-10" />
          <ProfileButton />
        </div>
        <div className="flex flex-col border-b border-gray-200 mx-6 mt-4">
          {userInfo ? (
            <>
              <h1 className="text-xl font-bold mt-4">{userInfo.name}</h1>
              <h2 className="text-gray-500">@{userInfo.username}</h2>
              <p className="text-sm text-gray-500 mt-4 max-h-16 overflow-hidden break-words"> 
                {userInfo.description}
              </p>
            </>
          ) : (
            <div className="text-gray-500 mt-4 P-8">User not found.</div>
          )}
          <div className="text-sm flex mt-4">
            <button className="text-gray-500 hover:text-button hover:underline">
              Followers: 34
            </button>
            <button className="ml-4 text-gray-500 hover:text-button hover:underline">
              Following: 56
            </button>
          </div>
        </div>
      </div>
      <ProfileNav />
      {children}
      <EditProfileModal userInfo={userInfo} />
    </div>
  )
}