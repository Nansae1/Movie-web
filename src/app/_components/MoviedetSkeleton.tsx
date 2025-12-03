export default function MoviedetSkeleton() {
  return (
    <div className="flex w-full max-w-270 flex-col pt-6 gap-6 ">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="h-10 w-44 bg-gray-300"></p>
            <p className="h-6 w-40 bg-gray-300"></p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="bg-gray-300 h-6 w-10"></p>
            <div className="flex items-center">
              <div className="flex flex-col gap-1">
                <p className=" h-6 w-8 bg-gray-300"></p>
                <p className="h-6 w-8 bg-gray-300"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 w-full max-w-270 h-107 relative">
          <img className="h-full w-72.5 bg-gray-300"></img>
          <img className="h-107 w-189.5 bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <p className="h-5 w-21 bg-gray-300"></p>
          <p className="h-5 w-21 bg-gray-300"></p>
          <p className="h-5 w-21 bg-gray-300"></p>
        </div>
        <p className="text-base text-[#09090B] h-12 w-270 bg-gray-300"></p>
        <div className="flex flex-col gap-5">
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7 h-6 bg-gray-300"></p>
            <p className="h-6 w-25 bg-gray-300"></p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7 bg-gray-300 h-6"></p>
            <p className="h-6 w-25 bg-gray-300"></p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7 bg-gray-300 h-6"></p>
            <p className="h-6 w-25 bg-gray-300"></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 pb-18.155">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl h-8 w-19 bg-gray-300"></p>
          <p className="flex gap-1 items-center hover:underline text-sm bg-gray-300 h-8 w-19"></p>
        </div>
        <div className="grid grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-93.5 bg-[#F4F4F5] flex flex-col rounded-lg gap-1"
            >
              <img className="h-71 w-full rounded-t-lg hover:grayscale-35 bg-gray-300"></img>
              <div className="flex flex-col mx-2">
                <div className="flex gap-2 items-center">
                  <img src="/star.png" className="h-4.5 w-4"></img>
                  <p className="text-xs h-6 w-2 bg-gray-300"></p>
                </div>
                <p className="text-base h-6 w-22 bg-gray-300"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
