export function OrderDetailsSkeleton() {
  return (
    <div className="p-5 bg-[#EFF3F7] rounded-md w-full animate-pulse">
      <div className="h-4 w-32 bg-gray-300 rounded" />

      <hr className="border-black/10 my-2" />

      <div className="flex items-center justify-between">
        <div className="h-3 w-24 bg-gray-300 rounded" />
        <div className="h-3 w-16 bg-gray-300 rounded" />
      </div>

      <div className="flex gap-1.5 mt-1 items-center">
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
        <div className="h-3 w-24 bg-gray-300 rounded" />
      </div>

      <div className="flex items-center gap-1 w-full mt-4">
        <div className="h-[22px] w-12 bg-gray-300 rounded-sm" />
        <div className="h-[22px] bg-gray-200 rounded-sm w-full" />
        <div className="h-[22px] w-6 bg-gray-300 rounded-sm" />
      </div>

      <div className="flex items-center justify-between mt-9">
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>

      <div className="flex flex-col gap-1 mt-9">
        <div className="h-10 rounded-md bg-gray-300" />
        <div className="h-10 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
