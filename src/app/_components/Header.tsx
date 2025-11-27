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
import { useState } from "react";
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

export default function Header({
  logoHref = "/",
  logoSrc = "/Logo.png",
  searchPlaceholder = "Search..",
  genres = [],
  initialQuery = "",
  showThemeToggle = true,
}: HeaderProps) {
  const { setTheme, theme } = useTheme();
  const [genres, setgenres] = useState<Genre[]>([]);
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
  </div>;
}
