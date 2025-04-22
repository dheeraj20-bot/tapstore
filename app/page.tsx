"use client";
import {Link, Zap } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Home() {
  const images = [
    { id: 1, href: "/12.jpg" },
    { id: 2, href: "/15.jpg" },
    { id: 3, href: "/16.jpg" },
    
  ];

  const categories = ["AI", "💬", " "];
  return (
    <div className="bg-black/20 backdrop-blur-3xl max-w-[28rem] mx-auto py-20 text-white min-h-screen p-4">
      {/* App header section */}

      <div className="flex items-start mb-6">
        {/* App icon */}
        <div className="w-[120px] h-[120px] rounded-xl mr-4">
          <img
            src="/appicon.png"
            alt="App Icon"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* App title and install button */}
        <div className="flex-1">
          <h1 className="text-[24px] font-bold">App name</h1>
          <p className="text-gray-400 text-sm mb-2">Sub-text of the app</p>

          <div className="flex items-center mt-8  justify-between">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="bg-[#5551FE] w-[80px] text-white  py-1 rounded-full">
                  Install
                </button>
              </DrawerTrigger>
              <DrawerContent className=" bg-gradient-to-b  from-[#211B1B] to-black h-[40rem] "> 
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-white flex mb-10 items-center  gap-2 justify-center"> <Zap className="w-4 h-4 text-white"/> <span className="text-[20px]"> Quick Install</span></DrawerTitle>
                  
                    
                        <span>1.Tap the Share button</span>
                        <div>2.Select “Add to Home Screen”</div>
                  </DrawerHeader>

                  <div className="py-10 flex justify-center">
                    <img
                      src="/panel.png"
                      alt="App Icon"
                      className=" w-[14rem]  h-[20rem]"
                    />
                  </div>
                 
                  
                </div>
              </DrawerContent>
            </Drawer>
            
            <Link className="text-[#5551FE] mr-5 " size={20} />
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

      {/* Scrollable screenshots with hidden scrollbar using inline styles */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
      

        {images.map((image) => (
          <img
            src={image.href}
            alt={`Screenshot ${image.id}`}
            key={image.id}
            className="flex-shrink-0 w-60 h-96 bg-gray-300 rounded-xl"
         /> 
         
        ))}
      </div>

      {/* App description */}
      <div className="mt-6 border-t border-gray-800 pt-4">
        <h2 className="font-bold mb-4">Discover Everything and Nothing!</h2>

        <p className="mb-4 text-sm">
          Uses machine learning to accurately predict how much grocery retailers
          will sell each day. This helps them order the perfect amount of
          inventory: enough to meet customer demand without sending tons of
          leftover food to landfill.
        </p>

        <p className="mb-4 text-sm">
          Uses machine learning to accurately predict how much grocery retailers
          will sell each day. This helps them order the perfect amount of
          inventory: enough to meet customer demand without sending tons of
          leftover food to landfill.
        </p>

        <div className="mt-6 text-sm">
          <p className="text-gray-400">Developer: Sunny LLC</p>
          <a href="https://www.guac-ai.com/" className="text-blue-500">
            https://www.guac-ai.com/
          </a>
        </div>
      </div>
    </div>
  );
}
