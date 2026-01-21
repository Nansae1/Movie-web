import Link from "next/link";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

type MovieProps = {
  movieId: string;
  moviesurl: string;
};

export const Morelikethiscard = ({ movieId, moviesurl }: MovieProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(moviesurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();

      setMovies(data.results);
    };

    getMovies();
  }, []);
  return (
    <div className="flex flex-col gap-8 pb-18.155">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-2xl">More like this</p>
        <Link href={`/morelikethis/${movieId}`}>
          <p className="flex gap-1 items-center hover:underline text-sm">
            See more <ArrowRightIcon className="h-4 w-4" />
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {movies?.slice(0, 5).map((item) => {
          return (
            <Link key={item.id} href={`/movie/${item.id}`}>
              <div className="h-93.5 bg-[#F4F4F5] flex flex-col rounded-lg gap-1">
                <img
                  className="h-71 w-full rounded-t-lg hover:grayscale-35"
                  src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                ></img>
                <div className="flex flex-col mx-2">
                  <div className="flex gap-2 items-center">
                    <img src="/star.png" className="h-4.5 w-4"></img>
                    <p className="text-xs">{item.vote_average.toFixed(1)}</p>
                  </div>
                  <p className="text-base">{item.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
