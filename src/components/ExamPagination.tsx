import { cn } from "#/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface ExamPaginationProps {
  page: number;
  totalPage: number;
}


function ExamPagination({ page, totalPage }: ExamPaginationProps) {
  const paginationGenerate = () => {
    let pagiList: Array<string | number> = [];

    if (totalPage <= 6) {
      for (let i = 1; i <= totalPage; i++) pagiList.push(i);
      return pagiList;
    }

    if (page < 5) return [1, 2, 3, 4, 5, "...", totalPage];

    if (page > totalPage - 5)
      return [
        1,
        "...",
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    return [
      1,
      "...",
      totalPage - 1,
      totalPage,
      totalPage + 1,
      "...",
      totalPage,
    ];
  };

  const pageList: Array<string | number> = paginationGenerate();

  const pageParam = new URLSearchParams();
  const currentPage = Number(pageParam.get("page")) || page;
  const router = useRouter();

  const handleChangePage = (newPage: number) => {
    const setPageParam = new URLSearchParams(pageParam.toString());
    setPageParam.set("page", newPage.toString());
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={cn(
              currentPage === 1 && "pointer-events-none cursor-none opacity-0",
            )}
          >
            <PaginationPrevious
              onClick={() => handleChangePage(currentPage - 1)}
            />
          </PaginationItem>

          {pageList.map((page, index) => (
            <PaginationItem key={"pagination-" + index + 1}>
              <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => handleChangePage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default ExamPagination;
