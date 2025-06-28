import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import WidgetTab from "@/components/WidgetTab";
import SignUpPrompt from "@/components/SignUpPrompt";
import CommentModal from "@/components/modals/CommentModal";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <>
      <div className="flex text-[#0F1419] min-h-screen max-w-[1400px] mx-auto 
      justify-center">
        <Sidebar />
        <PostFeed />
        <WidgetTab />
      </div>
      <CommentModal />
      <SignUpPrompt />
      <Loading />
    </>
  );
}
