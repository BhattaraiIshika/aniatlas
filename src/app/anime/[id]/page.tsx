import { notFound } from "next/navigation";
import { Star, Users, Calendar, Clapperboard, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReviewForm } from "@/components/review-form";
import { ReviewsList } from "@/components/reviews-list";
import { fetchAnimeById, fetchReviews } from "@/lib/queries";
import { displayTitle, splitPipe } from "@/lib/types";

export const revalidate = 300;

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const malId = Number(id);
  if (!Number.isInteger(malId)) notFound();

  const [anime, reviews] = await Promise.all([
    fetchAnimeById(malId),
    fetchReviews(malId),
  ]);

  if (!anime) notFound();

  const genres = splitPipe(anime.genres);
  const themes = splitPipe(anime.themes);
  const studios = splitPipe(anime.studios);
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <div>
          <div className="overflow-hidden rounded-xl border border-border/60 bg-muted">
            {anime.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={anime.image_url}
                alt={displayTitle(anime)}
                referrerPolicy="no-referrer"
                className="aspect-[3/4] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat icon={<Star className="h-4 w-4 text-primary" />} label="Score" value={anime.score?.toFixed(2) ?? "—"} />
            <Stat icon={<TrendingUp className="h-4 w-4 text-primary" />} label="Rank" value={anime.rank ? `#${anime.rank}` : "—"} />
            <Stat icon={<Users className="h-4 w-4 text-primary" />} label="Members" value={anime.members?.toLocaleString() ?? "—"} />
            <Stat icon={<Heart className="h-4 w-4 text-primary" />} label="Favorites" value={anime.favorites?.toLocaleString() ?? "—"} />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{displayTitle(anime)}</h1>
          {anime.title_english && anime.title_english !== anime.title ? (
            <p className="mt-1 text-muted-foreground">{anime.title}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {anime.type ? <Badge>{anime.type}</Badge> : null}
            {anime.status ? <Badge variant="secondary">{anime.status}</Badge> : null}
            {genres.map((g) => (
              <Badge key={g} variant="outline">
                {g}
              </Badge>
            ))}
          </div>

          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <InfoRow icon={<Calendar className="h-4 w-4" />} label="Aired" value={`${anime.aired_from ?? "?"} to ${anime.aired_to ?? "?"}`} />
            <InfoRow icon={<Clapperboard className="h-4 w-4" />} label="Episodes" value={anime.episodes ? String(anime.episodes) : "Unknown"} />
            <InfoRow label="Duration" value={anime.duration ?? "—"} />
            <InfoRow label="Rating" value={anime.rating ?? "—"} />
            <InfoRow label="Source" value={anime.source ?? "—"} />
            <InfoRow label="Studios" value={studios.join(", ") || "—"} />
          </div>

          {themes.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {themes.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}

          {anime.synopsis ? (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Synopsis</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {anime.synopsis}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Reviews{" "}
              {avgRating ? (
                <span className="font-normal text-muted-foreground">
                  ({avgRating.toFixed(1)} avg &middot; {reviews.length})
                </span>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewsList reviews={reviews} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Write a review</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm animeId={anime.mal_id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5">{value}</div>
    </div>
  );
}
