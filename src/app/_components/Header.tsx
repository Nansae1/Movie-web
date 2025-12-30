"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { ACCESS_TOKEN } from "./MovieSection";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const genreurl =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";

export type Genre = {
  id: number;
  name: string;
};
export type HeaderProps = {
  logoHref?: string;
  logoSrc?: string;
  genres: Genre[];
  searchPlaceholder?: string;
  initialQuery?: string;
  showThemeToggle?: boolean;
};

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [genres, setgenres] = useState<Genre[]>([]);

  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
  console.log("aaaaA", genreIds);
  const pathname = usePathname();
  const router = useRouter();

  const handleClickGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatedGenreIds = genreIds?.includes(genreId)
      ? genreIds.filter((id) => id !== genreId)
      : [...genreIds, genreId];
    params.set("genreIds", updatedGenreIds.join(","));
    router.push("/genresfilter" + "?" + params);
  };

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
  return (
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
                    className="hover:bg-black hover:text-white"
                    variant={
                      genreIds.includes(genre.id.toString())
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleClickGenre(genre.id.toString())}
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
          <SearchInput />
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
  );
}
