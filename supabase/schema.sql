-- Schema for the Anime Explorer site.
-- `anime` already exists (bulk-loaded from anime_dataset.csv by the sibling
-- anime-streamlit-project). This file adds the reviews table + RLS policies
-- needed by the Next.js/Shadcn frontend and documents the full schema.

-- ============================================================
-- anime (existing table, shown here for reference only)
-- ============================================================
-- mal_id           bigint primary key
-- title            text
-- title_english    text
-- title_japanese   text
-- type             text        -- TV, Movie, OVA, ...
-- source           text
-- episodes         double precision
-- status           text
-- airing           boolean
-- aired_from       text
-- aired_to         text
-- duration         text
-- rating           text
-- score            double precision
-- scored_by        double precision
-- rank             double precision
-- popularity       double precision
-- members          double precision
-- favorites        double precision
-- season           text
-- year             double precision
-- studios          text
-- producers        text
-- licensors        text
-- genres           text        -- pipe-separated, e.g. "Action|Sci-Fi"
-- themes           text        -- pipe-separated
-- demographics     text
-- synopsis         text
-- image_url        text

-- The bulk CSV load produced ~139 exact-duplicate rows (same mal_id loaded
-- more than once). Dedupe and enforce a primary key so `reviews` can hold a
-- real foreign key into it.
delete from public.anime a
using public.anime b
where a.ctid > b.ctid
  and a.mal_id = b.mal_id;

alter table public.anime
  add constraint anime_pkey primary key (mal_id);

alter table public.anime enable row level security;

drop policy if exists "anime is publicly readable" on public.anime;
create policy "anime is publicly readable"
  on public.anime for select
  to anon
  using (true);

-- ============================================================
-- reviews (new) -- lets visitors rate & review an anime
-- ============================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  anime_id bigint not null references public.anime (mal_id) on delete cascade,
  reviewer_name text not null check (char_length(trim(reviewer_name)) between 1 and 60),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists reviews_anime_id_idx on public.reviews (anime_id);

alter table public.reviews enable row level security;

drop policy if exists "reviews are publicly readable" on public.reviews;
create policy "reviews are publicly readable"
  on public.reviews for select
  to anon
  using (true);

drop policy if exists "anyone can add a review" on public.reviews;
create policy "anyone can add a review"
  on public.reviews for insert
  to anon
  with check (true);
