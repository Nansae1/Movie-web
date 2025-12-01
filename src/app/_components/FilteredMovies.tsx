import Link from "next/link";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import { useEffect, useState } from "react";
import { PaginationCard } from "./PaginationCard";

type MovieCardProps = {
  currentGenreName?: string;
  genreIds: string;
};

export const FilteredMovies = ({
  currentGenreName,
  genreIds,
}: MovieCardProps) => {
  const [filtermovies, setFiltermovies] = useState<Movie[]>([]);
  const [totalmovie, setTotalmovie] = useState(0);
  const [totalpage, setTotalpage] = useState(1);

  const [page, setPage] = useState(1);
  const filtermovieurl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`;

  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(filtermovieurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const data = (await res.json()) as {
        results: Movie[];
        total_results: number;
        total_pages: number;
      };
      console.log("gg", data);
      setTotalmovie(data.total_results);
      setTotalpage(data.total_pages);
      setFiltermovies(data.results);
    };
    getGenre();
  }, [page]);
  return (
    <div className="flex flex-col gap-8 pl-4 border-l">
      <p className="text-xl font-semibold">
        {totalmovie} titles in “{currentGenreName}”
      </p>
      <div className="grid grid-cols-4 w-201.5 gap-8">
        {filtermovies?.map((filtermovie) => {
          return (
            <Link key={filtermovie.id} href={`/movie/${filtermovie.id}`}>
              <div
                key={filtermovie.id}
                className="h-82.75 w-41.25 flex bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg flex-col gap-2 "
              >
                <img
                  className="h-61 w-full rounded-t-lg hover:grayscale-35"
                  src={
                    "https://image.tmdb.org/t/p/w500/" + filtermovie.poster_path
                  }
                ></img>
                <div className="flex gap-2 items-center">
                  <img src="/star.png" className="h-4 w-4" />
                  <p className="text-xs">{filtermovie.vote_average}</p>
                </div>
                <p className="text-base">{filtermovie.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-201.5 flex justify-end h-10">
        <PaginationCard page={page} setPage={setPage} totalpage={totalpage} />
      </div>
    </div>
  );
};
