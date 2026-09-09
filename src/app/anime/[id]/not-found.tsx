import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AnimeNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Anime not found</h1>
      <p className="mt-2 text-muted-foreground">
        We couldn&apos;t find a title with that ID.
      </p>
      <Button className="mt-6" render={<Link href="/browse" />} nativeButton={false}>
        Back to browse
      </Button>
    </div>
  );
}
