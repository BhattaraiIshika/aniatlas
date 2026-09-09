import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Review } from "@/lib/types";

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reviews yet &mdash; be the first to share your take.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback>
              {review.reviewer_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{review.reviewer_name}</span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-3.5 w-3.5 fill-primary text-primary"
                        : "h-3.5 w-3.5 text-muted-foreground/40"
                    }
                  />
                ))}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
              {review.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
