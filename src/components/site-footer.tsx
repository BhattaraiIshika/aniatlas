export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p>
          AniAtlas &mdash; an anime dataset explorer built with Next.js, Shadcn UI, and Supabase.
        </p>
        <p className="mt-1">Anime data sourced from MyAnimeList via a public dataset.</p>
      </div>
    </footer>
  );
}
