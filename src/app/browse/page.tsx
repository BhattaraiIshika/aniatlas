import { Suspense } from "react";
import { AnimeCard } from "@/components/anime-card";
import { BrowseFilters } from "@/components/browse-filters";
import { BrowsePagination } from "@/components/browse-pagination";
import { fetchAnimePage, fetchGenreList, fetchTypeList, type SortKey } from "@/lib/queries";

const PAGE_SIZE = 24;

type SearchParams = { [key: string]: string | string[] | undefined };

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = first(sp.q);
  const genre = first(sp.genre);
  const type = first(sp.type);
  const sort = (first(sp.sort) as SortKey) || "popularity";
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const [genres, types, result] = await Promise.all([
    fetchGenreList(),
    fetchTypeList(),
    fetchAnimePage({ q, genre, type, sort, page, pageSize: PAGE_SIZE }),
  ]);

  const totalPages = Math.max(1, Math.ceil(result.count / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Browse anime</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {result.count.toLocaleString()} titles match your filters.
        </p>
      </div>

      <Suspense>
        <BrowseFilters genres={genres} types={types.map((t) => t.type)} />
      </Suspense>

      {result.data.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          No anime found. Try adjusting your filters.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {result.data.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Suspense>
          <BrowsePagination page={page} totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
}
