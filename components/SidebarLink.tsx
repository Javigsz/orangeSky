'use client'

import { openLogInModal } from "@/redux/slices/modalSlice"
import { RootState } from "@/redux/store"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

interface SidebarLinkProps {
  text: string
  path: string
  loggedIn?: boolean
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string
    titleId?: string
} & React.RefAttributes<SVGSVGElement>>
}

export default function SidebarLink ({ text, Icon, path, loggedIn } : SidebarLinkProps) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
    const isActive = path === "/"
    ? pathname === "/"
    : pathname.startsWith(path)

  return (
    (loggedIn && !user.username) ? (
      <li 
        className={`flex items-center text-xl mb-2 space-x-3 p-2.5 rounded-full cursor-pointer transition
        ${isActive ? "text-button font-bold" : "hover:bg-gray-200"}
        hover:bg-gray-100`}
        onClick={() => dispatch(openLogInModal())}
      >
        <Icon className="h-7" />
        <span className="hidden xl:block">{text}</span>
      </li>
    ) : (
      <Link href={path}>
        <li className={`flex items-center text-xl mb-2 space-x-3 p-2.5 rounded-full cursor-pointer transition
          ${isActive ? "text-button font-bold" : "hover:bg-gray-200"}
          hover:bg-gray-100`}
        >
          <Icon className="h-7" />
          <span className="hidden xl:block">{text}</span>
        </li>
      </Link>
    )
  )
}