import Link from "next/link";
import { Movie } from "./MovieSection";
import { ArrowRightIcon } from "lucide-react";

type MovieSearchProps = {
  movie: Movie;
  id: number;
};

export const MovieSearch = ({ movie, id }: MovieSearchProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="h-29 w-138.25 dark:bg-[#27272A] flex gap-4 justify-center">
        <img
          className="h-25 w-16.75 rounded-md hover:grayscale-35"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        ></img>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold">{movie.title}</p>
            <div className="flex items-center">
              <img src="/Star.png" className="h-4 w-4"></img>
              <p className="text-[14px]">{movie.vote_average}/10</p>
            </div>
          </div>
          <div className="flex gap-74.5 items-center">
            <p className="text-[14px]">2024</p>
            <p className="flex text-[14px] items-center justify-center hover:underline">
              See more <ArrowRightIcon className="h-4 w-4" />{" "}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
