"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BrowsePagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function hrefForPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  const pagesToShow = new Set(
    [1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages)
  );
  const sorted = Array.from(pagesToShow).sort((a, b) => a - b);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? hrefForPage(page - 1) : undefined}
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {sorted.map((p, idx) => (
          <PaginationItem key={p}>
            {idx > 0 && p - sorted[idx - 1] > 1 ? (
              <span className="px-2 text-muted-foreground">&hellip;</span>
            ) : null}
            <PaginationLink href={hrefForPage(p)} isActive={p === page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? hrefForPage(page + 1) : undefined}
            aria-disabled={page >= totalPages}
            className={page >= totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
