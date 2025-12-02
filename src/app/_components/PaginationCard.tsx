import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type PageProps = {
  currentpage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalpage: number;
};

export const PaginationCard = ({
  currentpage,
  setCurrentPage,
  totalpage,
}: PageProps) => {
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Pagination className="w-full flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button onClick={prevPage} disabled={currentpage === 1}>
            {" "}
            <ChevronLeft /> Prev
          </Button>
        </PaginationItem>
        {currentpage > 3 && (
          <>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setCurrentPage((currentpage = 1))}
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {currentpage > 1 && (
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setCurrentPage(currentpage - 1)}
            >
              {currentpage - 1}
            </Button>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button variant={"default"}>{currentpage}</Button>
        </PaginationItem>
        {currentpage < totalpage && (
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setCurrentPage(currentpage + 1)}
            >
              {currentpage + 1}
            </Button>
          </PaginationItem>
        )}
        {currentpage < totalpage - 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => setCurrentPage(totalpage)}
              >
                {totalpage}
              </Button>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button onClick={nextPage} disabled={currentpage === totalpage}>
            {" "}
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
