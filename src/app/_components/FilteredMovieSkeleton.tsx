export default function FilteredMovieSkeleton() {
  return (
    <div className="grid grid-cols-4 w-201.5 gap-8">
      <div className="h-82.75 w-41.25 flex bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg flex-col gap-2 ">
        <img className="h-61 w-full rounded-t-lg bg-gray-300"></img>
        <div className="flex gap-2 items-center">
          <p className="pl-2 text-xs  bg-gray-300 h-5 w-30"></p>
        </div>
        <p className=" pl-2 text-base  bg-gray-300 h-5 w-40"></p>
      </div>
    </div>
  );
}
