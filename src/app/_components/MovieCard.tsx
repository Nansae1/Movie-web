import { Movie } from "../page";

export const MovieCard = (props: Movie) => {
  return (
    <div className="h-109.75 bg-[#F4F4F5] flex flex-col rounded-lg gap-1">
      <img
        className="h-85 w-full rounded-t-lg hover:grayscale-35"
        src={props.img}
      ></img>
      <div className="flex flex-col mx-2">
        <div className="flex gap-2 items-center">
          <img src="./star.png" className="h-4.5 w-4"></img>
          <p className="text-xs">{props.rate}</p>
        </div>
        <p className="text-lg">{props.title}</p>
      </div>
    </div>
  );
};
