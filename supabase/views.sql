-- Aggregation views backing the browse filters and the /stats dashboard.
-- Keeping these as views means the frontend never has to pull all ~30k
-- rows just to build a genre dropdown or a bar chart.

create or replace view public.genre_list as
select distinct trim(g) as genre
from public.anime, unnest(string_to_array(genres, '|')) as g
where genres is not null and trim(g) <> ''
order by 1;

create or replace view public.genre_counts as
select trim(g) as genre, count(*)::int as count
from public.anime, unnest(string_to_array(genres, '|')) as g
where genres is not null and trim(g) <> ''
group by trim(g)
order by count desc;

create or replace view public.type_counts as
select coalesce(type, 'Unknown') as type, count(*)::int as count
from public.anime
group by type
order by count desc;

create or replace view public.year_counts as
select year::int as year, count(*)::int as count, round(avg(score)::numeric, 2) as avg_score
from public.anime
where year is not null
group by year
order by year;

grant select on public.genre_list, public.genre_counts, public.type_counts, public.year_counts to anon;
