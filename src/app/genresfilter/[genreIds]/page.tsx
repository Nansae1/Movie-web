"use client";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { ACCESS_TOKEN, Movie } from "@/app/_components/MovieSection";
import { genreurl } from "@/app/_components/Header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { FilteredMovies } from "@/app/_components/FilteredMovies";
export type Genre = {
  id: number;
  name: string;
};

export default function Genre() {
  const [genres, setgenres] = useState<Genre[]>([]);

  // const { genreIds } = useParams() as { genreIds: string };

  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genreIds")?.split(",") || [];
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
                      // className={cn(
                      //   "bg-white text-black px-2 border border-[#E4E4E7] text-xs gap-2 hover:bg-black hover:text-white",
                      //   genre.id === Number(genreIds) && "bg-black text-white"
                      // )}
                      variant={
                        genreIds.includes(genre.id.toString())
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleClickGenre(genre.id.toString())}
                    >
                      {genre.name} <ChevronRight />
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>
          <FilteredMovies currentGenreName={currentGenreName} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
