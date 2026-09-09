"use client";

import { useActionState, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitReview, type SubmitReviewState } from "@/lib/actions";
import { cn } from "@/lib/utils";

const initialState: SubmitReviewState = { ok: false };

export function ReviewForm({ animeId }: { animeId: number }) {
  const [state, formAction, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [handledState, setHandledState] = useState(state);

  if (state !== handledState) {
    setHandledState(state);
    if (state.ok) {
      setRating(0);
      setFormKey((k) => k + 1);
    }
  }

  useEffect(() => {
    if (state.ok) {
      toast.success("Thanks for your review!");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form key={formKey} action={formAction} className="space-y-4">
      <input type="hidden" name="anime_id" value={animeId} />
      <input type="hidden" name="rating" value={rating} />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  (hoverRating || rating) >= star
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="reviewer_name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <Input
          id="reviewer_name"
          name="reviewer_name"
          maxLength={60}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label htmlFor="comment" className="mb-1.5 block text-sm font-medium">
          Review
        </label>
        <Textarea
          id="comment"
          name="comment"
          maxLength={1000}
          rows={4}
          placeholder="What did you think?"
          required
        />
      </div>

      <Button type="submit" disabled={pending || rating === 0}>
        {pending ? "Posting..." : "Post review"}
      </Button>
    </form>
  );
}
