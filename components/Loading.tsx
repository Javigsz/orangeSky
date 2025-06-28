'use client'

import { LinearProgress } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Loading() {
  const loadingScreenOpen = useSelector((state: RootState) => state.loading.loadingScreenOpen)

  return (
    <div className={`${loadingScreenOpen ? "opacity-100 z-50" : "opacity-0 -z-50"} h-screen fixed top-0 left-0 bottom-0 right-0 
      bg-white z-50 flex items-center justify-center transition`}
    >
      <div className="flex flex-col items-center">
        <Image src="/logo.jpg" width={120} height={120} alt="Logo" className="mb-10" />
        <h1 className="text-xl font-bold text-button mb-10">Loading...</h1>
        <LinearProgress sx={{
          width: 265,
          height: 10,
          backgroundColor: '#F9A50C',
          "& .MuiLinearProgress-bar": {
            backgroundColor: '#8C5626',
          },
        }}/>
      </div>
    </div>
  )
}
