"use client";

import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { FilteredMovies } from "@/app/_components/FilteredMovies";
import GenreList from "@/app/_components/GenreList";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <div className="h-screen w-screen flex flex-col items-center gap-13">
        <Header />
        <div className="flex flex-col items-center w-7xl gap-8">
          <h1 className="flex w-302.5 justify-start text-3xl font-semibold">
            Search filter
          </h1>
          <div className="flex gap-5.125 ">
            <GenreList />
            <FilteredMovies />
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
