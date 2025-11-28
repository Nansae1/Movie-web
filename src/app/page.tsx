"use client";
import Image from "next/image";

import * as React from "react";
import ReactPlayer from "react-player";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MovieSection } from "./_components/MovieSection";
import { Play, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { MovieCarousel } from "./_components/MovieCarousel";

const slideimg = ["/wicked.jpg", "/movie2.png", "/movie3.jpg"];

export type Movie = {
  img: string;
  rate: string;
  title: string;
};

type MovieSection = {
  title: string;
  url: string;
  path: string;
  categoryName: string;
  showButton: Boolean;
};
export const moviesections: MovieSection[] = [
  {
    title: "Upcoming",
    url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    path: "/category/upcoming",
    categoryName: "upcoming",
    showButton: true,
  },
  {
    title: "Popular",
    url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    path: "/category/popular",
    categoryName: "popular",
    showButton: true,
  },
  {
    title: "Top Rated",
    url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    path: "/category/top-rated",
    categoryName: "top-rated",
    showButton: true,
  },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="flex flex-col gap-6 w-screen justify-center items-center">
        <Header />
        <MovieCarousel />
      </div>
      <div className="w-screen flex flex-col gap-13 my-7">
        {moviesections.map((s) => {
          return (
            <MovieSection
              key={s.title}
              title={s.title}
              url={s.url}
              path={s.path}
              categoryName={s.categoryName}
              showButton={true}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
