'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarLinkProps {
  text: string
  path: string
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string
    titleId?: string
} & React.RefAttributes<SVGSVGElement>>
}

export default function SidebarLink ({ text, Icon, path } : SidebarLinkProps) {
  const pathname = usePathname()
  return (
    <Link href={path}>
      <li className={`flex items-center text-xl mb-2 space-x-3 p-2.5 rounded-full cursor-pointer transition
        ${path === pathname ? "text-button font-bold" : "hover:bg-gray-200"}
        hover:bg-gray-100`}
      >
        <Icon className="h-7" />
        <span className="hidden xl:block">{text}</span>
      </li>
    </Link>
  )
}