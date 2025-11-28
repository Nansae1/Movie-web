export default function Footer() {
  return (
    <div className="py-10 px-15 w-full max-w-360 bg-[#4338CA] flex gap-122.25 my-7">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <img src="/Vector (7).png" className="h-5 w-5"></img>
          <p className="text-white">Movie Z</p>
        </div>
        <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex gap-24">
        <div className="flex flex-col pb-16">
          <div className="text-white">Contact Information</div>
          <div className="flex gap-3 items-center">
            <img className="h-4 w-4" src="/Wifi icon.png"></img>
            <div className="flex flex-col">
              <p className="text-white">Email:</p>
              <p className="text-white">support@movieZ.com</p>
            </div>
          </div>
          <div className="flex  gap-3 items-center">
            <img src="/Wifi icon (1).png" className="h-4 w-4"></img>
            <div className="flex flex-col">
              <p className="text-white">Phone:</p>
              <p className="text-white">+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white">Follow us </div>
          <div className="flex gap-3">
            <p className="text-white">Facebook</p>
            <p className="text-white">Instagram</p>
            <p className="text-white">Twitter</p>
            <p className="text-white">Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
}
