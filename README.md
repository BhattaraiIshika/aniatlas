# AniAtlas

A searchable atlas of ~30,000 anime titles, built with Next.js, [Shadcn UI](https://ui.shadcn.com), and [Supabase](https://supabase.com), deployed on Vercel.

## Features

- **Browse** &mdash; search by title, filter by genre/type, sort by score/popularity/year, paginated.
- **Anime detail pages** &mdash; synopsis, studios, genres, and live user reviews.
- **Reviews** &mdash; anyone can rate (1-5 stars) and review a title; stored live in Supabase via a server action.
- **Stats dashboard** &mdash; genre distribution, format breakdown, and titles-per-year charts computed from SQL views.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Shadcn UI (`base-nova` style, built on Base UI) for all interactive components
- Supabase (Postgres) for data, with row-level security policies for public read + review inserts
- Recharts for the stats dashboard

## Data

The `anime` table holds the dataset (sourced from MyAnimeList). See [`supabase/schema.sql`](./supabase/schema.sql) for the `reviews` table + RLS policies, and [`supabase/views.sql`](./supabase/views.sql) for the aggregation views (`genre_list`, `genre_counts`, `type_counts`, `year_counts`) that back the browse filters and stats charts.


