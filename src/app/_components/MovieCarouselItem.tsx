"use client";
import { CarouselItem } from "@/components/ui/carousel";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import { Card, CardContent } from "@/components/ui/card";
import { VideoDialog } from "./VideoDialog";
import Link from "next/link";

type MovieCarouselItemProps = {
  movie: Movie;
};
export const MovieCarouselItem = ({ movie }: MovieCarouselItemProps) => {
  const { backdrop_path, id } = movie;

  const imageUrl = "https://image.tmdb.org/t/p/original/" + backdrop_path;

  return (
    <CarouselItem>
      <div>
        <Card className="border-none py-0">
          <CardContent
            className="flex w-full h-150 bg-center bg-cover relative"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="h-66 w-101 mx-35 my-46 gap-4">
              <div className="flex flex-col">
                <p className="text-base text-white">Now Playing:</p>
                <Link href={`/movie/${id}`}>
                  <p className="text-4xl text-white">{movie.title}</p>
                </Link>
                <div className="flex gap-2 items-center">
                  <img src="/star.png" className="h-4.5 w-4" />
                  <p className="text-base text-white">
                    {movie.vote_average}/10
                  </p>
                </div>
              </div>
              <div className="my-4 flex flex-col gap-4">
                <p className="text-xs text-white w-75.5">{movie.overview} </p>
                <VideoDialog movie={movie} id={id} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
