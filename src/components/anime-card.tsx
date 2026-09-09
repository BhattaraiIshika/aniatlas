import Link from "next/link";
import { Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Anime } from "@/lib/types";
import { displayTitle, splitPipe } from "@/lib/types";

export function AnimeCard({ anime }: { anime: Anime }) {
  const genres = splitPipe(anime.genres).slice(0, 2);

  return (
    <Link
      href={`/anime/${anime.mal_id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {anime.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={anime.image_url}
            alt={displayTitle(anime)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
        {anime.score ? (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {anime.score.toFixed(2)}
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {displayTitle(anime)}
        </h3>
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {anime.type ? <span>{anime.type}</span> : null}
          {anime.year ? <span>&middot; {anime.year}</span> : null}
        </div>
        <div className="mt-auto flex flex-wrap gap-1">
          {genres.map((g) => (
            <Badge key={g} variant="secondary" className="text-[10px]">
              {g}
            </Badge>
          ))}
        </div>
        {anime.members ? (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Users className="h-3 w-3" />
            {anime.members.toLocaleString()} members
          </div>
        ) : null}
      </div>
    </Link>
  );
}
