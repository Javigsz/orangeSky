import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import Sidebar from "@/components/Sidebar";
import WidgetTab from "@/components/WidgetTab";
import CommentModal from "@/components/modals/CommentModal";
import SignUpPrompt from "@/components/SignUpPrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OrangeSky",
  description: "OrangeSky App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <StoreProvider>
        <body className={inter.className}>
          <div className="flex text-[#0F1419] min-h-screen max-w-[1400px] mx-auto justify-center">
              <Sidebar />
              {children}
              <WidgetTab />
            </div>
            <CommentModal />
            <SignUpPrompt />
            {/* <Loading /> */}
        </body>
      </StoreProvider>
    </html>
  );
}
