"use client";
import Image from "next/image";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN, MovieSection } from "./_components/MovieSection";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Moon, Play, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { Genre, genreurl } from "./upcoming/page";

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
};

const moviesections: MovieSection[] = [
  {
    title: "Upcoming",
    url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    path: "/upcoming",
  },
  {
    title: "Popular",
    url: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    path: "/popular",
  },
  {
    title: "Top Rated",
    url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    path: "/top-rated",
  },
];

export default function Home() {
  const { setTheme, theme } = useTheme();
  const [genres, setgenre] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(genreurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();

      setgenre(data.results);
    };

    getGenre();
  }, []);
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  console.log(theme);

  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="flex flex-col gap-6 w-screen justify-center items-center">
        <div className="flex w-full justify-between max-w-360 h-15 items-center ">
          <img src="./Logo.png" className="h-5 w-23"></img>
          <div className="flex gap-3 items-center">
            <Popover>
              <PopoverTrigger
                className="h-9 w-24 border border-[#E4E4E7] rounded-md"
                asChild
              >
                <Button variant="secondary">
                  <ChevronDown />
                  Genre
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-144.25 h-83.25">
                <div className="flex flex-col gap-1 w-134.25 border-b pb-4 border-b-[#E4E4E7] dark:border-b-[#27272A]">
                  <p className="text-[24px] font-semibold">Genres</p>
                  <p>See lists of movies by genre</p>
                </div>
                <div className=" flex flex-wrap gap-4 my-4">
                  {genres.map((genre, index) => {
                    return (
                      <Badge
                        key={index}
                        className="bg-white text-black dark:bg-black dark:border-[#27272A] dark:text-white px-2 border border-[#E4E4E7] text-xs gap-2"
                      >
                        {genre.name} <ChevronRight />
                      </Badge>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            <div className=" relative flex items-center">
              <Search className="absolute  left-3 w-4 h-4" />
              <Input className="h-9 w-94.75 pl-10" placeholder="Search.." />
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Moon className="h-9 w-9 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:text-white" />
          </Button>
        </div>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full max-w-360 h-150 relative"
        >
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="border-none py-0">
                    <CardContent
                      className="flex w-full h-150 bg-center bg-cover"
                      style={{ backgroundImage: `url(${slideimg[index]})` }}
                    >
                      <div className="h-66 w-101 mx-35 my-46 gap-4">
                        <div className="flex flex-col">
                          <p className="text-base text-white">Now Playing:</p>
                          <p className="text-4xl text-white">Wicked</p>
                          <p className="text-base text-white">6.9/10</p>
                        </div>
                        <div className="my-4 flex flex-col gap-4">
                          <p className="text-xs text-white w-75.5">
                            Elphaba, a misunderstood young woman because of her
                            green skin, and Glinda, a popular girl, become
                            friends at Shiz University in the Land of Oz. After
                            an encounter with the Wonderful Wizard of Oz, their
                            friendship reaches a crossroads.{" "}
                          </p>
                          <Dialog
                            open={showTrailer}
                            onOpenChange={setShowTrailer}
                          >
                            <DialogTrigger asChild>
                              <Button
                                className="bg-white text-black absolute top-95 left-45"
                                onClick={() => setShowTrailer(true)}
                              >
                                <Play /> Watch trailer
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="p-0 border-0 bg-transparent shadow-none sm:max-w-250 top-110">
                              <img
                                src="/trailer.png"
                                alt="Trailer"
                                className="h-140.25 w-250"
                              />
                              <DialogClose asChild>
                                <button className="absolute -top-2 -right-2 rounded px-2 py-1">
                                  <X className="w-4 h-4" />
                                </button>
                              </DialogClose>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-10 w-10 flex justify-center items-center absolute top-70 left-11" />
          <CarouselNext className="h-10 w-10 flex justify-center items-center absolute top-70 right-11" />
        </Carousel>
      </div>
      <div className="w-screen flex flex-col gap-13 my-7">
        {moviesections.map((s) => {
          return (
            <MovieSection
              key={s.title}
              title={s.title}
              url={s.url}
              path={s.path}
            />
          );
        })}
      </div>
      <div className="py-10 px-15 w-full max-w-360 bg-[#4338CA] flex gap-122.25 my-7">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <img src="./Vector (7).png" className="h-5 w-5"></img>
            <p className="text-white">Movie Z</p>
          </div>
          <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col pb-16">
            <div className="text-white">Contact Information</div>
            <div className="flex gap-3 items-center">
              <img className="h-4 w-4" src="./Wifi icon.png"></img>
              <div className="flex flex-col">
                <p className="text-white">Email:</p>
                <p className="text-white">support@movieZ.com</p>
              </div>
            </div>
            <div className="flex  gap-3 items-center">
              <img src="./Wifi icon (1).png" className="h-4 w-4"></img>
              <div className="flex flex-col">
                <p className="text-white">Phone:</p>
                <p className="text-white">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-white">Follow us </div>
            <div className="flex gap-3">
              <p className="text-white">Facebook</p>
              <p className="text-white">Instagram</p>
              <p className="text-white">Twitter</p>
              <p className="text-white">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
