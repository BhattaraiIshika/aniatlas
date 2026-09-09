export type Anime = {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string | null;
  airing: boolean | null;
  aired_from: string | null;
  aired_to: string | null;
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  season: string | null;
  year: number | null;
  studios: string | null;
  producers: string | null;
  licensors: string | null;
  genres: string | null;
  themes: string | null;
  demographics: string | null;
  synopsis: string | null;
  image_url: string | null;
};

export type Review = {
  id: string;
  anime_id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export function splitPipe(value: string | null): string[] {
  if (!value) return [];
  return value
    .split("|")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function displayTitle(anime: Pick<Anime, "title" | "title_english">) {
  return anime.title_english?.trim() || anime.title;
}
