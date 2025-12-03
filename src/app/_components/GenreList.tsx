"use client";

import { useEffect, useState } from "react";
import { Genre, genreurl } from "./Header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ACCESS_TOKEN } from "./MovieSection";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function GenreList() {
  const [genres, setgenres] = useState<Genre[]>([]);

  // const { genreIds } = useParams() as { genreIds: string };

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
    router.push(pathname + "?" + params);
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
    <div className="flex flex-col w-96.75">
      <p className="text-2xl font-semibold">Genres</p>
      <p>See lists of movies by genre</p>
      <div className="w-full flex flex-wrap gap-4 my-4">
        {genres?.map((genre, index) => {
          return (
            <Badge
              key={index}
              className="hover:bg-black hover:text-white"
              variant={
                genreIds.includes(genre.id.toString()) ? "default" : "outline"
              }
              onClick={() => handleClickGenre(genre.id.toString())}
            >
              {genre.name} <ChevronRight />
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
