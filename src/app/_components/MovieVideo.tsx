import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
import ReactPlayer from "react-player";

type MovieProps = {
  movie?: Movie;
  movieId: string;
};

export const MovieVideo = ({ movie, movieId }: MovieProps) => {
  const videourl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&page=1`;
  const [video, setVideo] = useState<string>("");

  useEffect(() => {
    const getMovies = async () => {
      const videoRes = await fetch(videourl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const videoData = await videoRes.json();

      setVideo(videoData?.results[0]?.key);
    };

    getMovies();
  }, []);
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div className="flex gap-8 w-full max-w-270 h-107 relative">
      <p className="text-white absolute top-96 left-96">Play trailer 2:35</p>
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
  );
};
