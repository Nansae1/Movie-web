import { Arrow } from "@radix-ui/react-popover";
import { MovieCard } from "./MovieCard";
import { ArrowRightIcon } from "lucide-react";
import { Movie } from "../page";

type MovieSectionProps = {
  title: string;
  movies: Movie[];
};

export const MovieSection = ({ title, movies }: MovieSectionProps) => {
  return (
    <div className="w-screen flex flex-col gap-13 my-7">
      <div className="w-full h-244.5 flex flex-col items-center gap-8">
        <div className="flex w-full max-w-360 justify-between">
          <p className="text-2xl font-semibold">{title}</p>
          <p className="text-sm flex gap-1 items-center">
            See more <ArrowRightIcon className="h-4 w-4" />
          </p>
        </div>
        <div className="grid grid-cols-5 gap-8 w-full max-w-360">
          {movies.map((item, index) => (
            <MovieCard
              key={index}
              img={item.img}
              rate={item.rate}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
