"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {  PlusSquare, Share, Zap } from "lucide-react";
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
import Loading from "@/app/[slug]/loading";

export const AppScreen = () => {
  const { slug } = useParams();
  const router = useRouter(); 
  const [appData, setAppData] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controls drawer open state
  const [installStep, setInstallStep] = useState(1);

  const fetchAppBySlug = async (slug: string) => {
    const res = await fetch(
      `https://tapstore-strapi-k3av8.ondigitalocean.app/api/apps?filters[slug][$eq]=${slug}&populate=*`
    );
    const json = await res.json();
    const app = json.data[0];
    console.log(app);

    setAppData(app);
  };

  // const handleInstallClick = () => {
  //   setIsDrawerOpen(true);
  
  //   // Start redirect timer
  //   setTimeout(() => {
  //     const targetUrl = appData?.targetAppurl || "/";
  //     if (targetUrl.startsWith("http") || targetUrl.startsWith("/")) {
  //       router.push(targetUrl);
  //     } else {
  //       console.error("Invalid redirect URL");
  //     }
  //   }, 4000);
  // };

  const handleInstallClick = () => {
    setIsDrawerOpen(true);
    setInstallStep(1);
  };

  // Continue to app in a new tab and show step 2
  const handleContinueToApp = () => {
    const targetUrl = appData?.targetAppurl || "/";
    if (targetUrl.startsWith("http") || targetUrl.startsWith("/")) {
      window.open(targetUrl, "_blank");
      setInstallStep(2);
    } else {
      console.error("Invalid redirect URL");
    }
  };

  const targetAppDomain = appData?.targetAppurl
    ? new URL(appData.targetAppurl).hostname
    : "example1.com";

  useEffect(() => {
    if (slug) {
      fetchAppBySlug(slug as string);
    }
  }, [slug]);

  if (!appData) {
    return <Loading />;
  }

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
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <button
                onClick={handleInstallClick}
                className="bg-[#5551FE] cursor-pointer w-[80px] text-white py-1 rounded-full">
                  Install
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#211B1B]">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-white flex mb-10 items-center gap-2 justify-center">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="text-[20px]"> Quick Install</span>
                    </DrawerTitle>

                    {installStep === 1 ? (
                      <div className="space-y-6">
                        <div className="text-center mb-4">
                          <p className="text-white/80 mb-2">
                            You'll be installing <span className="font-bold text-white">{targetAppDomain}</span>
                          </p>
                          <button
                            onClick={handleContinueToApp}
                            className="bg-[#5551FE] cursor-pointer px-4 py-2 text-white rounded-full mt-2"
                          >
                            Continue to {targetAppDomain}
                          </button>
                        </div>

                        <div className="border-t border-gray-700 pt-4">
                          <p className="text-center text-white/60 mb-4">After you continue, follow these steps:</p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#5551FE] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</div>
                              <span>Tap the <Share className="w-4 h-4 inline mx-1" /> Share button</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="bg-[#5551FE] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</div>
                              <span>Select <PlusSquare className="w-4 h-4 inline mx-1" /> "Add to Home Screen"</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Step 2 Confirmation
                      <div className="space-y-6 text-center">
                        <h3 className="text-lg font-medium">Installing {targetAppDomain}</h3>
                        <p>We've opened {targetAppDomain} in a new tab.</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#5551FE] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</div>
                            <span>Tap the <Share className="w-4 h-4 inline mx-1" /> Share button</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="bg-[#5551FE] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</div>
                            <span>Select <PlusSquare className="w-4 h-4 inline mx-1" /> "Add to Home Screen"</span>
                          </div>
                        </div>
                      </div>
                    )}
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