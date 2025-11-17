import { MovieCard } from "./MovieCard";

export const MovieSection = ({ title, movies }) => {
  return (
    <div className="w-screen flex flex-col gap-13 my-7">
      <div className="w-full h-244.5 flex flex-col items-center gap-8">
        <div className="flex w-full max-w-360 justify-between">
          <p className="text-2xl font-semibold">{title}</p>
          <p className="text-sm">See more</p>
        </div>
        <div className="grid grid-cols-5 gap-8 w-full max-w-360">
          {movies.map((item, index) => (
            <MovieCard
              key={index}
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
