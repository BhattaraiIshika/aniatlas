"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

export type SubmitReviewState = {
  ok: boolean;
  error?: string;
};

export async function submitReview(
  _prevState: SubmitReviewState,
  formData: FormData
): Promise<SubmitReviewState> {
  const animeId = Number(formData.get("anime_id"));
  const reviewerName = String(formData.get("reviewer_name") ?? "").trim();
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "").trim();

  if (!animeId) return { ok: false, error: "Missing anime." };
  if (reviewerName.length < 1 || reviewerName.length > 60) {
    return { ok: false, error: "Name must be 1-60 characters." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Rating must be between 1 and 5." };
  }
  if (comment.length < 1 || comment.length > 1000) {
    return { ok: false, error: "Review must be 1-1000 characters." };
  }

  const { error } = await supabase.from("reviews").insert({
    anime_id: animeId,
    reviewer_name: reviewerName,
    rating,
    comment,
  });

  if (error) {
    return { ok: false, error: "Could not save your review. Please try again." };
  }

  revalidatePath(`/anime/${animeId}`);
  return { ok: true };
}
