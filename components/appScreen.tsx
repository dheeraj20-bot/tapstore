"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  Zap } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Markdown  from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export const AppScreen = () => {
  const { slug } = useParams();
  const [appData, setAppData] = useState<any>(null);


  const fetchAppBySlug = async (slug: string) => {
    const res = await fetch(
      `https://tapstore-strapi-k3av8.ondigitalocean.app/api/apps?filters[slug][$eq]=${slug}&populate=*`
    );
    const json = await res.json();
    const app = json.data[0];
    console.log(app);

    setAppData(app);
  };

  useEffect(() => {
    if (slug) {
      fetchAppBySlug(slug as string);
    }
  }, [slug]);

  // Handle drawer open state
  // Removed duplicate handleDrawerOpen function

  

  return (
    <div className="bg-black/20 backdrop-blur-3xl max-w-[28rem] mx-auto py-20 text-white min-h-screen p-4">
      {/* App header section */}

      <div className="flex items-start mb-6">
        {/* App icon */}
        <div className="w-[120px] h-[120px] rounded-xl mr-4">
          <img
            src={
              appData?.appLogo?.documentId
                ? `https://tapstore-strapi-k3av8.ondigitalocean.app${appData?.appLogo?.url}`
                : "/appicon.png"
            }
            alt="App Icon"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* App title and install button */}
        <div className="flex-1">
          <h1 className="text-[24px] font-bold">
            {appData?.appName || "App name"}
          </h1>
          <p className="text-gray-400 text-sm mb-2">
            {appData?.subText || "Sub-text of the app"}
          </p>

          <div className="flex items-center mt-8 justify-between">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="bg-[#5551FE] cursor-pointer w-[80px] text-white py-1 rounded-full">
                  Install
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#211B1B] h-[40rem]">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-white flex mb-10 items-center gap-2 justify-center">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="text-[20px]"> Quick Install</span>
                    </DrawerTitle>

                    <span>1. Tap the Share button</span>
                    <div>2. Select "Add to Home Screen"</div>
                  </DrawerHeader>

                  <div className="py-5 flex justify-center">
                    <video
                      src={"/demo.mp4"}
                      autoPlay
                      loop
                      muted
                      className="w-[250px]"
                    />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            <Link href={appData?.targetAppurl || "#"} target="_blank" className="inline-block mr-4">
            <img src="/link.svg" alt="Apple" className="w-6 h-6 " />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800"/>

      <div className="flex justify-between max-w-[15rem] mb-6 pt-4">
          <div className="text-center">
            <p className="text-xs block mt-1 text-white/50">Rating</p>
            <span className="text-xs block mt-1">{appData?.rating || "4.8"}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-white/50 text-xs">
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs block mt-1 text-white/50">Category</p>
            <span className="text-xs block mt-1">{appData?.category || "AI tools"}</span>
          </div>
          <div className="text-center">
            <p className="text-xs block mt-1 text-white/50">Platform</p>
            <span className="text-xs block mt-1">
              <img src="/apple.svg" alt="Apple" className="w-6 h-6 inline-block mr-1" />
            </span>
          </div>
        </div>

  
      {/* Scrollable screenshots */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {appData?.screenshot?.map((img: any) => (
          <img
            key={img.id}
            src={`https://tapstore-strapi-k3av8.ondigitalocean.app${img.url}`}
            alt={img.name}
            className="flex-shrink-0 h-96 object-cover rounded-xl"
          />
        ))}
      </div>

      {/* App description */}
      <div className="mt-6 border-t prose text-white/75 prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-a:text-indigo-500  max-w-none text-sm border-gray-800 pt-4">
      <Markdown children={appData?.description} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
};