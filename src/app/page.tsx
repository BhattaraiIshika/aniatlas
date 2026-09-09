import Link from "next/link";
import { ArrowRight, Compass, LineChart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimeCard } from "@/components/anime-card";
import { fetchFeaturedAnime } from "@/lib/queries";

export const revalidate = 3600;

export default async function Home() {
  const featured = await fetchFeaturedAnime(10);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent_55%),radial-gradient(circle_at_85%_10%,color-mix(in_oklch,var(--accent)_30%,transparent),transparent_50%)]"
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              29,900+ titles &middot; powered by Supabase
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Explore the anime universe,
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                one series at a time.
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              AniAtlas is a searchable atlas of nearly 30,000 anime &mdash; filter by genre and
              type, dig into scores and studios, and leave your own reviews.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/browse" />} nativeButton={false}>
                Start browsing
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/stats" />} nativeButton={false}>
                <LineChart className="mr-1 h-4 w-4" />
                View dataset stats
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Star className="h-5 w-5 text-primary" />
              Top rated
            </h2>
            <p className="text-sm text-muted-foreground">
              The highest-scored titles with at least 50,000 ratings.
            </p>
          </div>
          <Button variant="ghost" render={<Link href="/browse?sort=score" />} nativeButton={false}>
            See all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {featured.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={<Compass className="h-5 w-5" />}
              title="Filter & search"
              body="Narrow thousands of titles down by genre, format, and keyword in seconds."
            />
            <FeatureCard
              icon={<LineChart className="h-5 w-5" />}
              title="Dataset insights"
              body="Charts on genre popularity, anime released per year, and format breakdowns."
            />
            <FeatureCard
              icon={<Star className="h-5 w-5" />}
              title="Leave a review"
              body="Rate any title 1-5 stars and add your own take &mdash; stored live in Supabase."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
