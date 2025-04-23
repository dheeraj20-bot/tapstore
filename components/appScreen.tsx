"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link, Zap } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  const categories = ["AI", "💬", ""];

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
                <button className="bg-[#5551FE] w-[80px] text-white py-1 rounded-full">
                  Install
                </button>
              </DrawerTrigger>
              <DrawerContent className="bg-gradient-to-b from-[#211B1B] to-black h-[40rem]">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-white flex mb-10 items-center gap-2 justify-center">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="text-[20px]"> Quick Install</span>
                    </DrawerTitle>

                    <span>1. Tap the Share button</span>
                    <div>2. Select “Add to Home Screen”</div>
                  </DrawerHeader>

                  <div className="py-10 flex justify-center">
                    <img
                      src="/panel.png"
                      alt="Install Instruction"
                      className="w-[14rem] h-[20rem]"
                    />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            <Link className="text-[#5551FE] mr-5" size={20} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-4 mb-6">
        {categories.map((category, index) => (
          <div key={index} className="text-center">
            <p className="text-xs block mt-1 text-white/50">Category</p>
            <span className="text-xs block mt-1">{category}</span>
          </div>
        ))}
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
      <div className="mt-6 border-t  text-sm  border-gray-800 pt-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {appData?.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};
