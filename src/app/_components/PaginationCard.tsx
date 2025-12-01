import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

type PageProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalpage: number;
};

export const PaginationCard = ({ page, setPage, totalpage }: PageProps) => {
  return (
    <Pagination className="w-full flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={page === 1}
            onClick={() => setPage((page = 1))}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={page === 2}
            onClick={() => setPage((page = 2))}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={page === totalpage}
            onClick={() => setPage((page = totalpage))}
          >
            {totalpage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
