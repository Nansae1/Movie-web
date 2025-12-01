"use client";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import { PaginationCard } from "@/app/_components/PaginationCard";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { movieId } = useParams() as { movieId: string };
  const [page, setPage] = useState(1);
  const moviesurl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=${page}`;

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
  }, [page]);
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-8">
      <Header />
      <div className="flex w-full max-w-360 flex-col pt-6 gap-6">
        <div className=" flex flex-col gap-13 my-7">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-screen flex flex-col gap-13 my-7 items-center">
              <div className="w-screen flex flex-col gap-13 my-7">
                <div className="w-full flex flex-col items-center gap-8">
                  <div className="flex w-full max-w-319.25 justify-between">
                    <p className="text-2xl font-semibold">More like this</p>
                  </div>
                  <div className="grid grid-cols-5 gap-8 w-full max-w-319.25">
                    {movies?.map((item) => (
                      <Link key={item.id} href={`/movie/${item.id}`}>
                        <div className="h-93.5 bg-[#F4F4F5] flex flex-col rounded-lg gap-1">
                          <img
                            className="h-71 w-full rounded-t-lg hover:grayscale-35"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              item.poster_path
                            }
                          ></img>
                          <div className="flex flex-col mx-2">
                            <div className="flex gap-2 items-center">
                              <img src="/star.png" className="h-4.5 w-4"></img>
                              <p className="text-xs">{item.vote_average}</p>
                            </div>
                            <p className="text-base">{item.title}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-319.25 flex justify-end h-10">
                <PaginationCard page={page} setPage={setPage} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
