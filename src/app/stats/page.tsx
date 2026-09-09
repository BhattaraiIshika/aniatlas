import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenreBarChart } from "@/components/charts/genre-bar-chart";
import { TypePieChart } from "@/components/charts/type-pie-chart";
import { YearLineChart } from "@/components/charts/year-line-chart";
import { fetchGenreCounts, fetchTypeList, fetchYearCounts } from "@/lib/queries";

export const revalidate = 3600;

export default async function StatsPage() {
  const [genreCounts, typeCounts, yearCounts] = await Promise.all([
    fetchGenreCounts(10),
    fetchTypeList(),
    fetchYearCounts(),
  ]);

  const topTypes = typeCounts.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dataset stats</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick look at the shape of the anime catalog, computed live from Supabase.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top genres by title count</CardTitle>
          </CardHeader>
          <CardContent>
            <GenreBarChart data={genreCounts} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Titles by format</CardTitle>
          </CardHeader>
          <CardContent>
            <TypePieChart data={topTypes} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Titles released per year (1990&ndash;2026)</CardTitle>
          </CardHeader>
          <CardContent>
            <YearLineChart data={yearCounts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
