'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function ProfileNav() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  return (
    <nav className="flex justify-around font-bold">
      <button 
        className={`p-2 flex-grow rounded-md ${pathname.endsWith('/posts') ? 'border-b-4 border-button font-bold' : 
        'hover:bg-gray-500 hover:bg-opacity-35 border-b-4 border-transparent'}`} 
        onClick={() => router.push('/profile/' + id + '/posts')}
        >
          Posts
        </button>
      <button 
        className={`p-2 flex-grow rounded-md ${pathname.endsWith('/likes') ? 'border-b-4 border-button font-bold' :
         'hover:bg-gray-500 hover:bg-opacity-35 border-b-4 border-transparent'}`}
        onClick={() => router.push('/profile/' + id + '/likes')}
         >
          Likes
        </button>
    </nav>
  )
}
