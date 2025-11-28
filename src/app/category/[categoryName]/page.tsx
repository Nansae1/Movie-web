"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MovieSection } from "@/app/_components/MovieSection";
import { useParams } from "next/navigation";
import { moviesections } from "@/app/page";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function Page() {
  const { categoryName } = useParams() as { categoryName: string };
  const title =
    moviesections.find((el) => el.categoryName === categoryName)?.title || "";
  const path =
    moviesections.find((el) => el.categoryName === categoryName)?.path || "";

  const apiCategory = categoryName.replace(/-/g, "_");
  const url = `https://api.themoviedb.org/3/movie/${apiCategory}?language=en-US&page=1`;

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-8">
      <Header />
      <div className="flex w-full max-w-360 flex-col pt-6 gap-6">
        <div className=" flex flex-col gap-13 my-7">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-screen flex flex-col gap-13 my-7">
              <MovieSection
                categoryName={categoryName}
                title={title}
                showButton={false}
                url={url}
                path={path}
              />
            </div>
            <div className="w-319.25 flex justify-end h-10">
              <Pagination className="w-full flex justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
