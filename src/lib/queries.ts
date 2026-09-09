import { supabase } from "@/lib/supabase/client";
import type { Anime, Review } from "@/lib/types";

const CARD_COLUMNS =
  "mal_id, title, title_english, type, score, year, season, episodes, genres, image_url, members";

export type SortKey = "score" | "popularity" | "newest" | "title";

export type BrowseParams = {
  q?: string;
  genre?: string;
  type?: string;
  sort?: SortKey;
  page?: number;
  pageSize?: number;
};

export async function fetchAnimePage({
  q,
  genre,
  type,
  sort = "popularity",
  page = 1,
  pageSize = 24,
}: BrowseParams): Promise<{ data: Anime[]; count: number }> {
  let query = supabase.from("anime").select(CARD_COLUMNS, { count: "exact" });

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,title_english.ilike.%${q}%,title_japanese.ilike.%${q}%`
    );
  }
  if (genre) {
    query = query.ilike("genres", `%${genre}%`);
  }
  if (type) {
    query = query.eq("type", type);
  }

  switch (sort) {
    case "score":
      query = query.order("score", { ascending: false, nullsFirst: false });
      break;
    case "newest":
      query = query.order("year", { ascending: false, nullsFirst: false });
      break;
    case "title":
      query = query.order("title", { ascending: true });
      break;
    default:
      query = query.order("members", { ascending: false, nullsFirst: false });
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;
  return { data: (data ?? []) as Anime[], count: count ?? 0 };
}

export async function fetchAnimeById(malId: number): Promise<Anime | null> {
  const { data, error } = await supabase
    .from("anime")
    .select("*")
    .eq("mal_id", malId)
    .maybeSingle();
  if (error) throw error;
  return data as Anime | null;
}

export async function fetchFeaturedAnime(limit = 10): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime")
    .select(CARD_COLUMNS)
    .not("score", "is", null)
    .gte("scored_by", 50000)
    .order("score", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Anime[];
}

export async function fetchGenreList(): Promise<string[]> {
  const { data, error } = await supabase.from("genre_list").select("genre");
  if (error) throw error;
  return (data ?? []).map((row) => row.genre as string);
}

export async function fetchTypeList(): Promise<{ type: string; count: number }[]> {
  const { data, error } = await supabase.from("type_counts").select("type, count");
  if (error) throw error;
  return (data ?? []) as { type: string; count: number }[];
}

export async function fetchGenreCounts(limit = 12): Promise<{ genre: string; count: number }[]> {
  const { data, error } = await supabase
    .from("genre_counts")
    .select("genre, count")
    .order("count", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as { genre: string; count: number }[];
}

export async function fetchYearCounts(): Promise<
  { year: number; count: number; avg_score: number | null }[]
> {
  const { data, error } = await supabase
    .from("year_counts")
    .select("year, count, avg_score")
    .gte("year", 1990)
    .lte("year", 2026)
    .order("year", { ascending: true });
  if (error) throw error;
  return (data ?? []) as { year: number; count: number; avg_score: number | null }[];
}

export async function fetchReviews(animeId: number): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("anime_id", animeId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Review[];
}
