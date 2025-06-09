export function ProductItemSkeleton() {
  return (
    <article className="py-10 px-8 bg-[#EFF3F7] flex gap-6 rounded-md animate-pulse">
      <div className="w-24 h-24 bg-gray-300 rounded-md" />

      <div className="flex flex-col w-full gap-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />

        <div className="flex items-end justify-between mt-auto">
          <div className="h-3 w-16 bg-gray-300 rounded" />

          <div className="flex flex-col items-end gap-1">
            <div className="h-5 w-20 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}
