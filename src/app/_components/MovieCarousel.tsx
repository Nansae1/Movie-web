"use client";

import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";
import Autoplay from "embla-carousel-autoplay";
import { MovieCarouselItem } from "./MovieCarouselItem";

export const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 5));
    };
    fetchMovies();
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-360 h-150 relative"
    >
      <CarouselContent>
        {movies.map((movie) => (
          <MovieCarouselItem key={movie.id} movie={movie} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 flex justify-center items-center absolute top-70 left-11" />
      <CarouselNext className="h-10 w-10 flex justify-center items-center absolute top-70 right-11" />
    </Carousel>
  );
};
