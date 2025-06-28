import Sidebar from "@/components/Sidebar";
import WidgetTab from "@/components/WidgetTab";
import SignUpPrompt from "@/components/SignUpPrompt";
import { PostHeader } from "@/components/Post";
import { ArrowLeftIcon, ArrowUpTrayIcon, ChartBarIcon, ChatBubbleLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase"

// interface PostData {
//   name?: string;
//   username?: string;
//   likes?: number[];
//   comments?:
//   // add other fields as needed
// }

const fetchPost = async (id: string) => {
  const postRef = doc(db, "post", id)
  const postSnap = await getDoc(postRef)
  return postSnap.data()
}

interface PageProps {
  params: {
    id: string
  }
}

interface Comment {
  name: string
  text: string
  username: string
}

export default async function page({ params }: PageProps) {
  const { id } = params
  const post = await fetchPost(id)

  return (
    <>
      <div className="flex text-[#0F1419] min-h-screen max-w-[1400px] mx-auto 
        justify-center"
      >
        <Sidebar />
          <div className="flex-grow max-w-2xl border-x border-gray-200">
            <div className="py-4 px-3 text-lg sm:text-xl sticky 
              top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200
              flex items-center
            ">
              <Link href="/">
                <ArrowLeftIcon className="w-5 h-5 mr-10 cursor-pointer" />
              </Link>
              OrangeSky
            </div>
            <div className="flex flex-col p-3 space-y-5 border-b border-gray-200">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex space-x-3">
                  <Image
                    src={"/profile-pic.jpg"}
                    width={44}
                    height={44}
                    alt="Profile picture"
                    className="w-11 h-11"
                  />
                  <div className="flex flex-col text-[15px]">
                    <span className="font-bold whitespace-nowrap 
                      inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
                      sm:max-w-[160px] overflow-hidden text-ellipsis"
                    >
                      {post?.name}
                    </span>
                    <span className="text-gray-500 whitespace-nowrap 
                      inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
                      sm:max-w-[160px] overflow-hidden text-ellipsis"
                    >
                      {post?.username}
                    </span>
                  </div>
                </div>
                <EllipsisHorizontalIcon 
                  className="w-5 h-5"
                />
              </div>
              <span className="text-[15px]">{post?.text}</span>
            </div>
            <div className="border-b boreder-gray-200 p-3 text-[15px]">
                <span className="font-bold">{post?.likes.length}</span> Likes
            </div>
            <div className="border-b border-gray-200 p-3 text-[15px] flex justify-evenly">
              <ChatBubbleLeftEllipsisIcon className="w-[22px] h-[22px] text-gray-500 cursor-not-allowed" /> 
              <HeartIcon className="w-[22px] h-[22px] text-gray-500 cursor-not-allowed" />
              <ChartBarIcon className="w-[22px] h-[22px] text-gray-500 cursor-not-allowed" />
              <ArrowUpTrayIcon className="w-[22px] h-[22px] text-gray-500 cursor-not-allowed" />
            </div>
            {post?.comments.map((comment: Comment) => 
              <Comment 
                name={comment.name}
                username={comment.username}
                text={comment.text}
              />
            )
            }
          </div>
        <WidgetTab />
      </div>
      <SignUpPrompt />
    </>
  )
}

function Comment({ name, username, text }: Comment ) {
  return(
    <div className="border-b border-gray-200">
      <PostHeader name={name} username={username} text={text} />
      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed" /> 
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
      </div>
    </div>
  )
}
