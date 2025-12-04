"use client";
import Link from "next/link";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import { useEffect, useState } from "react";
import { PaginationCard } from "./PaginationCard";
import FilteredMovieSkeleton from "./FilteredMovieSkeleton";
import { useSearchParams } from "next/navigation";

export const FilteredMovies = () => {
  const [filtermovies, setFiltermovies] = useState<Movie[]>([]);
  const [totalmovie, setTotalmovie] = useState(0);
  const [totalpage, setTotalpage] = useState(1);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log(genreIds.join(), "agdag");
  const [currentpage, setCurrentPage] = useState(1);
  const filtermovieurl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds
    .filter((item) => item)
    .join()}&page=${currentpage}`;

  useEffect(() => {
    const getGenre = async () => {
      setLoading(true);

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

      setLoading(false);
    };
    getGenre();
  }, [currentpage, genreIds.join()]);

  return (
    <div className="flex flex-col gap-8 pl-4 border-l">
      <p className="text-xl font-semibold">{totalmovie} titles</p>
      {loading && (
        <div className="grid grid-cols-4 w-201.5 gap-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <FilteredMovieSkeleton key={index} />
          ))}
        </div>
      )}
      {!loading && (
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
                      "https://image.tmdb.org/t/p/w500/" +
                      filtermovie.poster_path
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
      )}
      <div className="w-201.5 flex justify-end h-10">
        <PaginationCard
          currentpage={currentpage}
          setCurrentPage={setCurrentPage}
          totalpage={totalpage}
        />
      </div>
    </div>
  );
};
