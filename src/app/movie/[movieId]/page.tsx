"use client";

import * as React from "react";
import ReactPlayer from "react-player";
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
  Fullscreen,
  Icon,
  Moon,
  Play,
  Search,
  X,
} from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { title } from "process";
import Link from "next/link";

export type Genre = {
  id: number;
  name: string;
};

type Info = {
  crew: Crew[];
  cast: Cast[];
};
type Crew = {
  department: string;
  known_for_department: string;
  name: string;
};

type Cast = {
  name: string;
};

export const genreurl =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";

export default function Page() {
  const { setTheme, theme } = useTheme();
  const [genres, setgenres] = useState<Genre[]>([]);

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

  const { movieId } = useParams() as { movieId: string };
  const [movie, setMovie] = useState<Movie>();
  const [video, setVideo] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [info, setInfo] = useState<Info>();

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`;
  const videourl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&page=1`;
  const moviesurl = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const infourl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`;

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const videoRes = await fetch(videourl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const infoRes = await fetch(infourl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();
      const videoData = await videoRes.json();
      const infoData = await infoRes.json();
      console.log("aaaaaaaaaa", infoData);

      setMovie(data);
      setVideo(videoData?.results[0]?.key);
      setInfo(infoData);
    };

    getMovies();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(moviesurl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();

      console.log("ggg", data);

      setMovies(data.results);
    };

    getMovies();
  }, []);

  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col items-center">
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
          <div className="flex gap-8 w-full max-w-270 h-107 relative">
            <p className="text-white absolute top-96 left-96">
              Play trailer 2:35
            </p>
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
              className="h-full w-72.5"
            ></img>
            <ReactPlayer
              src={`https://wwww.youtube.com/watch?v=${video}`}
              width={758}
              height={428}
            />
            <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
              <DialogTrigger asChild>
                <Button
                  className="bg-white text-black absolute top-95 left-85"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play /> Watch trailer
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 border-0 bg-transparent shadow-none h-140 sm:max-w-250 top-110">
                <DialogTitle className="hidden">Trailer</DialogTitle>
                <ReactPlayer
                  src={`https://wwww.youtube.com/watch?v=${video}`}
                  style={{ height: "100%", width: "250" }}
                />
                <DialogClose asChild>
                  <button className="absolute -top-2 text-white -right-2 rounded px-2 py-1">
                    <X className="w-4 h-4" />
                  </button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
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
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7">Director</p>
            <p>
              {info?.crew
                .filter((item) => item.department === "Directing")
                .map((item) => item.name)}
            </p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7">Writers</p>
            <p>
              {info?.crew
                .filter((item) => item.department === "Writing")
                .map((item) => item.name)}
            </p>
          </div>
          <div className="flex gap-13 pb-2 border-b border-[#E4E4E7]">
            <p className="text-base font-bold w-7">Stars</p>
            <p>{info?.cast[0].name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 pb-18.155">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-2xl">More like this</p>
            <Link href={`/morelikethis/${movieId}`}>
              <p className="flex gap-1 items-center hover:underline text-sm">
                See more <ArrowRightIcon className="h-4 w-4" />
              </p>
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-8">
            {movies?.slice(0, 5).map((item) => {
              return (
                <Link key={item.id} href={`/movie/${item.id}`}>
                  <div className="h-93.5 bg-[#F4F4F5] flex flex-col rounded-lg gap-1">
                    <img
                      className="h-71 w-full rounded-t-lg hover:grayscale-35"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + item.poster_path
                      }
                    ></img>
                    <div className="flex flex-col mx-2">
                      <div className="flex gap-2 items-center">
                        <img src="/star.png" className="h-4.5 w-4"></img>
                        <p className="text-xs">{item.vote_average}</p>
                      </div>
                      <p className="text-base">{item.title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
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
