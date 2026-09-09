"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SORT_OPTIONS = [
  { value: "popularity", label: "Most popular" },
  { value: "score", label: "Highest score" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title (A-Z)" },
];

const ALL_VALUE = "__all__";

export function BrowseFilters({
  genres,
  types,
}: {
  genres: string[];
  types: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === ALL_VALUE) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParam("q", q.trim());
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4 sm:flex-row sm:items-center">
      <form onSubmit={handleSearchSubmit} className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title..."
          className="pl-9"
        />
      </form>

      <Select
        value={searchParams.get("genre") ?? ALL_VALUE}
        onValueChange={(v) => updateParam("genre", v)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Genre">
            {(v: string) => (v === ALL_VALUE ? "All genres" : v)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All genres</SelectItem>
          {genres.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("type") ?? ALL_VALUE}
        onValueChange={(v) => updateParam("type", v)}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="Type">
            {(v: string) => (v === ALL_VALUE ? "All types" : v)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All types</SelectItem>
          {types.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("sort") ?? "popularity"}
        onValueChange={(v) => updateParam("sort", v)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort by">
            {(v: string) => SORT_OPTIONS.find((opt) => opt.value === v)?.label ?? v}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(searchParams.get("q") ||
        searchParams.get("genre") ||
        searchParams.get("type") ||
        searchParams.get("sort")) && (
        <Button variant="ghost" onClick={() => router.push(pathname)}>
          Reset
        </Button>
      )}
    </div>
  );
}
