"use client";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import { genreurl } from "@/app/_components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <Header />
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
                        "bg-white text-black px-2 border border-[#E4E4E7] text-xs gap-2 hover:bg-black hover:text-white",
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
                  <Link key={filtermovie.id} href={`/movie/${filtermovie.id}`}>
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
                  </Link>
                );
              })}
            </div>
            <div className="w-201.5 flex justify-end h-10">
              <Pagination className="w-full h-full flex justify-end">
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
      <Footer />
    </div>
  );
}
