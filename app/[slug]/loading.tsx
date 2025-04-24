'use client'
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-black/20 backdrop-blur-3xl max-w-[28rem] mx-auto py-20 text-white min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <Skeleton className="w-[120px] h-[120px] rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
          <Skeleton className="h-8 w-20 mt-6 rounded-full" />
        </div>
      </div>

      {/* App info */}
      <div className="flex justify-between max-w-[15rem]">
        <div className="space-y-2 text-center">
          <Skeleton className="h-4 w-10 mx-auto" />
          <Skeleton className="h-4 w-10 mx-auto" />
        </div>
        <div className="space-y-2 text-center">
          <Skeleton className="h-4 w-10 mx-auto" />
          <Skeleton className="h-4 w-10 mx-auto" />
        </div>
        <div className="space-y-2 text-center">
          <Skeleton className="h-6 w-6 mx-auto rounded-full" />
        </div>
      </div>

      {/* Screenshot placeholders */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-96 w-52 rounded-xl flex-shrink-0" />
        ))}
      </div>

      {/* Description block */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full max-w-[85%] rounded" />
        ))}
      </div>
    </div>
  );
};
