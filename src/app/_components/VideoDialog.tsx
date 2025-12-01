import { useEffect, useState } from "react";
import { ACCESS_TOKEN, Movie } from "./MovieSection";
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

type MovieSearchProps = {
  movie: Movie;
  id: number;
};

export const VideoDialog = ({ movie, id }: MovieSearchProps) => {
  const [video, setVideo] = useState<string>("");

  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&page=1`;

  useEffect(() => {
    const getVideos = async () => {
      const res = await fetch(videoUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();

      setVideo(data?.results[0].key);
    };

    getVideos();
  }, []);

  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
      <DialogTrigger asChild>
        <Button
          className="bg-white text-black absolute top-107 left-40"
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
  );
};
