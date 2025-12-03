export default function CategorySkeleton() {
  return (
    <div className="h-109.75 w-57.4325 bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col rounded-lg gap-2">
      <img className="h-85 w-full rounded-t-lg hover:grayscale-35 bg-gray-300"></img>
      <div className="flex flex-col mx-2 gap-2">
        <div className="flex gap-2 items-center">
          <p className="text-xs  bg-gray-300 h-5 w-30"></p>
        </div>
        <p className="text-base bg-gray-300 h-5 w-40"></p>
      </div>
    </div>
  );
}
