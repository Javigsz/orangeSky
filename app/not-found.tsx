'use client'

import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function NotFound() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(closeLoadingScreen())
  }, [dispatch])

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 
      bg-white flex flex-col items-center justify-center z-50 space-y-3"
    >
      <Image src="/logo.jpg" width={120} height={120} alt="Logo" className="mb-10" />
      <h2><span className="text-red-500 text-xl">404</span> - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <button className="bg-button text-white h-[48px] rounded-full hover:shadow-md mb-5 px-10 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
}
