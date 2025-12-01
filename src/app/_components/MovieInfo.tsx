import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "./MovieSection";

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

type Movie = {
  movieId: string;
};

export const MovieInfo = ({ movieId }: Movie) => {
  const [info, setInfo] = useState<Info>();
  const infourl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`;

  useEffect(() => {
    const getMovies = async () => {
      const infoRes = await fetch(infourl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const infoData = await infoRes.json();

      setInfo(infoData);
    };

    getMovies();
  }, []);
  return (
    <div className="flex flex-col gap-5">
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
  );
};
