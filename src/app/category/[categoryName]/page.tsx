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
  Link,
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
import {
  ACCESS_TOKEN,
  Movie,
  MovieSection,
} from "@/app/_components/MovieSection";
import { use, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { moviesections } from "@/app/page";

export type Genre = {
  id: number;
  name: string;
};

export const genreurl =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";

export default function Page() {
  const { categoryName } = useParams() as { categoryName: string };
  const title =
    moviesections.find((el) => el.categoryName === categoryName)?.title || "";
  const path =
    moviesections.find((el) => el.categoryName === categoryName)?.path || "";
  const upper = categoryName.charAt(0).toUpperCase;

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

      setgenre(data.genres);
    };

    getGenre();
  }, []);

  const [movies, setMovies] = useState<Movie[]>([]);

  const apiCategory = categoryName.replace(/-/g, "_");
  const url = `https://api.themoviedb.org/3/movie/${apiCategory}?language=en-US&page=1`;
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
        <a href="/">
          <img
            src="/Logo.png"
            alt="Back to HomePage"
            className="h-5 w-23"
          ></img>
        </a>
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
            <PopoverContent className="w-144.25 ">
              <div className="flex flex-col gap-1 w-134.25 border-b pb-4 border-b-[#E4E4E7] dark:border-b-[#27272A]">
                <p className="text-[24px] font-semibold">Genres</p>
                <p>See lists of movies by genre</p>
              </div>
              <div className="w-full flex flex-wrap gap-4 my-4">
                {genres?.map((genre, index) => {
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
            <div className="w-screen flex flex-col gap-13 my-7">
              <MovieSection
                categoryName={categoryName}
                title={title}
                showButton={false}
                url={url}
                path={path}
              />
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
            <img src="/Vector (7).png" className="h-5 w-5"></img>
            <p className="text-white">Movie Z</p>
          </div>
          <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col pb-16">
            <div className="text-white">Contact Information</div>
            <div className="flex gap-3 items-center">
              <img className="h-4 w-4" src="/Wifi icon.png"></img>
              <div className="flex flex-col">
                <p className="text-white">Email:</p>
                <p className="text-white">support@movieZ.com</p>
              </div>
            </div>
            <div className="flex  gap-3 items-center">
              <img src="/Wifi icon (1).png" className="h-4 w-4"></img>
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
