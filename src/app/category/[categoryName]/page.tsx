"use client";

import {
  ACCESS_TOKEN,
  Movie,
  MovieSection,
} from "@/app/_components/MovieSection";
import { useParams } from "next/navigation";
import { moviesections } from "@/app/page";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import { PaginationCard } from "@/app/_components/PaginationCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { MovieCard } from "@/app/_components/MovieCard";

export default function Page() {
  const { categoryName } = useParams() as { categoryName: string };
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const title =
    moviesections.find((el) => el.categoryName === categoryName)?.title || "";

  useEffect(() => {
    const getMovies = async () => {
      const apiCategory = categoryName.replace(/-/g, "_");
      const url = `https://api.themoviedb.org/3/movie/${apiCategory}?language=en-US&page=${page}`;

      const res = await fetch(url, {
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
            <div className="w-screen flex flex-col gap-13 my-7">
              <div className="w-screen flex flex-col gap-13 my-7">
                <div className="w-full flex flex-col items-center gap-8">
                  <div className="flex w-full max-w-319.25 justify-between">
                    <p className="text-2xl font-semibold">{title}</p>
                  </div>
                  <div className="grid grid-cols-5 gap-8 w-full max-w-319.25">
                    {movies?.map((item, index) => (
                      <MovieCard key={index} movie={item} id={item.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-319.25 flex justify-end h-10">
              <PaginationCard
                page={page}
                setPage={setPage}
                totalpage={totalpage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
