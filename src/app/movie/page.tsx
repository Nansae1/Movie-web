"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Icon, Play, Search, X } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Genres } from "../page";

type Movie = {
  img: string;
  rate: string;
  title: string;
};

const movies: Movie[] = [
  {
    img: "/shawshank.jpg",
    rate: "9.3/10",
    title: "The Shawshank Redemption",
  },
  {
    img: "/shawshank.jpg",
    rate: "9.3/10",
    title: "The Shawshank Redemption",
  },
  {
    img: "/shawshank.jpg",
    rate: "9.3/10",
    title: "The Shawshank Redemption",
  },
  {
    img: "/shawshank.jpg",
    rate: "9.3/10",
    title: "The Shawshank Redemption",
  },
  {
    img: "/shawshank.jpg",
    rate: "9.3/10",
    title: "The Shawshank Redemption",
  },
];

export default function Page() {
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="flex w-full justify-between max-w-360 h-15 mt-4 items-center ">
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
              <div className="flex flex-col gap-1 w-134.25 border-b pb-4 border-b-[#E4E4E7]">
                <p className="text-[24px] font-semibold">Genres</p>
                <p>See lists of movies by genre</p>
              </div>
              <div className="w-full flex flex-wrap gap-4 my-4">
                {Genres.map((genre, index) => {
                  return (
                    <Badge
                      key={index}
                      className="bg-white text-black px-2 border border-[#E4E4E7] text-xs gap-2"
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
        <img src="./Modes.png" className="h-9 w-9"></img>
      </div>
      <div className="flex w-full max-w-270 flex-col pt-6 gap-6 ">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-4xl font-semibold">Wicked</p>
              <p>2024.11.26 · PG · 2h 40m</p>
            </div>
            <div className="flex flex-col">
              <p>Rating</p>
              <div className="flex items-center">
                <img src="./star.png" className="h-7 w-7"></img>
                <div className="flex flex-col">
                  <p className="text-lg">6.9/10</p>
                  <p className="text-xs">37k</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 w-full max-w-270 h-107 relative">
            <p className="text-white absolute top-96 left-96">
              Play trailer 2:35
            </p>
            <img src="./MoviePoster.png" className="h-full w-72.5"></img>
            <img src="./wickedba.jpg" className="h-full w-190"></img>
            <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
              <DialogTrigger asChild>
                <Button
                  className="bg-white text-black absolute top-95 left-85"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 border-0 bg-transparent shadow-none sm:max-w-250 top-100">
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
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Badge className="bg-white text-black px-2 border border-[#E4E4E7] text-xs">
              Fairy Tale
            </Badge>
            <Badge className="bg-white text-black px-2 border border-[#E4E4E7] text-xs">
              Pop Musical
            </Badge>
            <Badge className="bg-white text-black px-2 border border-[#E4E4E7] text-xs">
              Fantasy
            </Badge>
            <Badge className="bg-white text-black px-2 border border-[#E4E4E7] text-xs">
              Musical
            </Badge>
            <Badge className="bg-white text-black px-2 border border-[#E4E4E7] text-xs">
              Romance
            </Badge>
          </div>
          <p className="text-base text-[#09090B]">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.{" "}
          </p>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold">Director</p>
            <p>Jon M. Chu</p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold">Writers</p>
            <p>Winnie Holzman · Dana Fox · Gregory Maguire</p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold">Stars</p>
            <p>Cynthia Erivo · Ariana Grande · Jeff Goldblum</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 pb-18.155">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-2xl">More like this</p>
            <p className="flex gap-1 items-center">
              See more <ArrowRightIcon className="h-4 w-4" />
            </p>
          </div>
          <div className="grid grid-cols-5 gap-8">
            {movies.map((movie, index) => {
              return (
                <div
                  key={index}
                  className="h-93.095 bg-[#F4F4F5] flex flex-col rounded-lg gap-1"
                >
                  <img
                    className="h-70.345 w-full rounded-t-lg"
                    src={movie.img}
                  ></img>
                  <div className="flex flex-col mx-2">
                    <p className="text-xs">{movie.rate}</p>
                    <p className="text-base">{movie.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
