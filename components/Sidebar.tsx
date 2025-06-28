import React from 'react'
import Image from 'next/image'
import { HomeIcon,
  UserIcon,
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  InboxIcon,
  EllipsisHorizontalCircleIcon
 } from "@heroicons/react/24/outline"
import SideBarUserInfo from './SideBarUserInfo'

export default function Sidebar() {

  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20 xl:mr-10">
      <div className="relative h-full flex flex-col">
        <div className="py-3">
          <Image src={'/logo.jpg'} width={48} height={48} alt="Logo" />
        </div>
        <ul>
          <SidebarLink text="Home" Icon={HomeIcon} />
          <SidebarLink text="Explore" Icon={HashtagIcon} />
          <SidebarLink text="Notifications" Icon={BellIcon} />
          <SidebarLink text="Messages" Icon={InboxIcon} />
          <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
          <SidebarLink text="Profile" Icon={UserIcon} />
          <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
          <button className="hidden xl:block bg-button  w-[200px] h-[52px] rounded-full text-white
            cursor-pointer font-medium shadow-md mt-2"
          >
            Button
          </button>
        </ul>
        <SideBarUserInfo />
      </div>
    </nav>
  )
}

interface SidebarLinkProps {
  text: string
  Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>
}

function SidebarLink ({ text, Icon } : SidebarLinkProps) {
  return (
    <li className="flex items-center text-xl mb-2 space-x-3 p-2.5">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  )
}