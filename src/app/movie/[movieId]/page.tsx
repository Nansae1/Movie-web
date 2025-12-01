"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import { useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import { Morelikethiscard } from "@/app/_components/Morelikethiscard";
import { MovieVideo } from "@/app/_components/MovieVideo";
import { MovieInfo } from "@/app/_components/MovieInfo";

export default function Page() {
  const { movieId } = useParams() as { movieId: string };
  const [movie, setMovie] = useState<Movie>();

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`;
  const moviesurl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;

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

      setMovie(data);
    };

    getMovies();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full max-w-270 flex-col pt-6 gap-6 ">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-4xl font-semibold">{movie?.title}</p>
              <p>{movie?.release_date}</p>
            </div>
            <div className="flex flex-col">
              <p>Rating</p>
              <div className="flex items-center">
                <img src="/star.png" className="h-7 w-7"></img>
                <div className="flex flex-col">
                  <p className="text-lg">{movie?.vote_average}</p>
                  <p className="text-xs">{movie?.vote_count}</p>
                </div>
              </div>
            </div>
          </div>
          <MovieVideo movie={movie} movieId={movieId} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            {movie?.genres.map((item, index) => {
              return (
                <Badge
                  key={index}
                  className="bg-white text-black px-2 border border-[#E4E4E7] text-xs gap-2"
                >
                  {item.name} <ChevronRight />
                </Badge>
              );
            })}
          </div>
          <p className="text-base text-[#09090B]">{movie?.overview}</p>
          <MovieInfo movieId={movieId} />
        </div>
        <Morelikethiscard movieId={movieId} moviesurl={moviesurl} />
      </div>
      <Footer />
    </div>
  );
}
