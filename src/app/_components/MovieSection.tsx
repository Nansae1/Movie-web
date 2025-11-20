"use client";

import { Arrow } from "@radix-ui/react-popover";
import { MovieCard } from "./MovieCard";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export type MovieSectionProps = {
  title: string;
  url: string;
  path: string;
};

export type Movie = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODU0MTExYTc1ODgwNTEyZTMwM2I2MWY0MGFkNGE2ZSIsIm5iZiI6MTc2MzUyMjgwOS45MDYsInN1YiI6IjY5MWQzOGY5MjM5MDQwZDlhMjU3Y2Y1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zW4mm5SxqitlM3vfhaYynWexBCfxmc4mfsNw6Dm3dWk";

export const MovieSection = ({ title, url, path }: MovieSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
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
  }, []);

  return (
    <div className="w-screen flex flex-col gap-13 my-7">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex w-full max-w-319.25 justify-between">
          <p className="text-2xl font-semibold">{title}</p>
          <Link href={path}>
            <p className="text-sm flex gap-1 items-center hover:underline">
              See more <ArrowRightIcon className="h-4 w-4" />
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-8 w-full max-w-319.25">
          {movies.map((item, index) => (
            <MovieCard key={index} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
