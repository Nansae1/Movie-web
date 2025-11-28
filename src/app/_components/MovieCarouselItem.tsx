"use client";
import { CarouselItem } from "@/components/ui/carousel";
import { Movie } from "./MovieSection";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import ReactPlayer from "react-player";
import React, { useState } from "react";

type MovieCarouselItemProps = {
  movie: Movie;
};
export const MovieCarouselItem = ({ movie }: MovieCarouselItemProps) => {
  const { poster_path, title } = movie;

  const imageUrl = "https://image.tmdb.org/t/p/w500/" + poster_path;

  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <CarouselItem>
      <div>
        <Card className="border-none py-0">
          <CardContent
            className="flex w-full h-150 bg-center bg-cover"
            style={{ backgroundImage: imageUrl }}
          >
            <div className="h-66 w-101 mx-35 my-46 gap-4">
              <div className="flex flex-col">
                <p className="text-base text-white">Now Playing:</p>
                <p className="text-4xl text-white">{movie.title}</p>
                <p className="text-base text-white">{movie.vote_count}/10</p>
              </div>
              <div className="my-4 flex flex-col gap-4">
                <p className="text-xs text-white w-75.5">{movie.overview} </p>
                <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-white text-black absolute top-95 left-45"
                      onClick={() => setShowTrailer(true)}
                    >
                      <Play /> Watch trailer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 border-0 bg-transparent shadow-none h-140 sm:max-w-250 top-110">
                    <DialogTitle className="hidden">Trailer</DialogTitle>
                    <ReactPlayer
                      src="https://youtu.be/6COmYeLsz4c?si=dpRGc_bBMgzLkEtA"
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
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
