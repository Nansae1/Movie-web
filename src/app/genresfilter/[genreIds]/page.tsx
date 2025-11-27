"use client";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import { genreurl } from "@/app/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export type Genre = {
  id: number;
  name: string;
};

export default function Genre() {
  const { setTheme, theme } = useTheme();
  const [genres, setgenres] = useState<Genre[]>([]);
  const [filtermovies, setFiltermovies] = useState<Movie[]>([]);

  const { genreIds } = useParams() as { genreIds: string };
  const filtermovieurl = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=1,2,3`;
  const currentGenreName = genres.find(
    (genre) => genre.id === Number(genreIds)
  )?.name;
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
      setgenres(data.genres);
    };
    getGenre();
  }, []);
  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(filtermovieurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const data = await res.json();
      console.log("gg", data);
      setFiltermovies(data.results);
    };
    getGenre();
  }, []);
  return (
    <div className="h-screen w-screen flex flex-col items-center gap-13">
      <div className="flex w-full justify-between max-w-360 h-15 mt-4 items-center ">
        <a href="/">
          <img src="/Logo.png" className="h-5 w-23"></img>
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
              <div className="flex flex-col gap-1 w-134.25 border-b pb-4 border-b-[#E4E4E7]">
                <p className="text-[24px] font-semibold">Genres</p>
                <p>See lists of movies by genre</p>
              </div>
              <div className="w-full flex flex-wrap gap-4 my-4">
                {genres?.map((genre, index) => {
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Moon className="h-9 w-9 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:text-white" />
        </Button>
      </div>
      <div className="flex flex-col items-center w-7xl gap-8">
        <h1 className="flex w-302.5 justify-start text-3xl font-semibold">
          Search filter
        </h1>
        <div className="flex gap-5.125 ">
          <div className="flex flex-col w-96.75">
            <p className="text-2xl font-semibold">Genres</p>
            <p>See lists of movies by genre</p>
            <div className="w-full flex flex-wrap gap-4 my-4">
              {genres?.map((genre, index) => {
                return (
                  <Link key={genre.id} href={`/genresfilter/${genre.id}`}>
                    <Badge
                      key={index}
                      className={cn(
                        "bg-white text-black px-2 border border-[#E4E4E7] text-xs gap-2",
                        genre.id === Number(genreIds) && "bg-black text-white"
                      )}
                    >
                      {genre.name} <ChevronRight />
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-8 pl-4 border-l">
            <p className="text-xl font-semibold">
              {filtermovies.length} titles in “{currentGenreName}”
            </p>
            <div className="grid grid-cols-4 w-201.5 gap-8">
              {filtermovies?.map((filtermovie) => {
                return (
                  <div
                    key={filtermovie.id}
                    className="h-82.75 w-41.25 flex bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg flex-col gap-2 "
                  >
                    <img
                      className="h-61 w-full rounded-t-lg hover:grayscale-35"
                      src={
                        "https://image.tmdb.org/t/p/w500/" +
                        filtermovie.poster_path
                      }
                    ></img>
                    <div className="flex gap-2 items-center">
                      <img src="/star.png" className="h-4 w-4" />
                      <p className="text-xs">{filtermovie.vote_average}</p>
                    </div>
                    <p className="text-base">{filtermovie.title}</p>
                  </div>
                );
              })}
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
