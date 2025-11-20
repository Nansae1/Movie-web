"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Icon,
  Moon,
  Play,
  Search,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ACCESS_TOKEN, Movie } from "../_components/MovieSection";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Genre, genreurl } from "../upcoming/page";

const movies = [
  { img: "./christmas.jpg", rate: "6.9/10", title: "Dear Santa" },
  {
    img: "./dragon.jpg",
    rate: "6.9/10",
    title: "How To Train Your Dragon Live Action",
  },
  { img: "./alien.jpg", rate: "6.9/10", title: "Alien Romulus" },
  { img: "./ashes.jpg", rate: "6.9/10", title: "From the Ashes" },
  {
    img: "./spacedog.jpg",
    rate: "6.9/10",
    title: "Space Dogg",
  },
  {
    img: "./Slide 4_3 - 1.png",
    rate: "6.9/10",
    title: "The Order",
  },
  {
    img: "./Slide 4_3 - 1 (1).png",
    rate: "6.9/10",
    title: "Y2K",
  },
  {
    img: "./Slide 4_3 - 1 (2).png",
    rate: "6.9/10",
    title: "Solo Leveling: ReAwakening",
  },
  {
    img: "./Slide 4_3 - 1 (3).png",
    rate: "6.9/10",
    title: "Get Away",
  },
  {
    img: "./Slide 4_3 - 1 (4).png",
    rate: "6.9/10",
    title: "Sonic the Hedgehog 3",
  },
];

const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export default function Page() {
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
    <div className="w-screen h-screen flex flex-col items-center gap-8">
      <div className="flex w-full justify-between max-w-360 h-15 items-center mt-3">
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
              <div className="w-full flex flex-wrap gap-4 my-4">
                {genres.map((genre, index) => {
                  return (
                    <Badge
                      key={index}
                      className="bg-white text-black px-2 border border-[#E4E4E7] dark:bg-black dark:border-[#27272A] dark:text-white text-xs gap-2"
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
          <Moon className="h-9 w-9 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
      </div>
      <div className="flex w-full max-w-360 flex-col pt-6 gap-6">
        <div className=" flex flex-col gap-13 my-7">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-360 font-semibold text-3xl">
              Top Rated
            </div>
            <div className="grid grid-cols-5 gap-8 w-full max-w-360">
              {movies.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-109.75 bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col rounded-lg gap-1"
                  >
                    <img
                      className="h-85 w-full rounded-t-lg hover:grayscale-35"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + item.poster_path
                      }
                    ></img>
                    <div className="flex flex-col mx-2">
                      <div className="flex gap-2 items-center">
                        <img src="./star.png" className="h-4.5 w-4"></img>
                        <p className="text-xs">{item.vote_average}</p>
                      </div>
                      <p className="text-lg">{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-end h-10">
              <Pagination className="w-full flex justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
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
