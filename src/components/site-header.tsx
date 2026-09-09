"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/stats", label: "Stats" },
];

export function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/browse?q=${encodeURIComponent(trimmed)}` : "/browse");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg">AniAtlas</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              render={<Link href={link.href} />}
              nativeButton={false}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-sm flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime titles..."
              className="pl-9"
            />
          </div>
        </form>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" className="ml-auto md:hidden" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="px-4 pt-4">Menu</SheetTitle>
            <div className="flex flex-col gap-4 p-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anime..."
                />
              </form>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start"
                    render={<Link href={link.href} />}
                    nativeButton={false}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
