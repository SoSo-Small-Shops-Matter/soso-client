import { z } from "zod";

export const ReviewReportSchema = z.object({
  num: z.number(),
  reviewId: z.number(),
  userEmail: z.string(),
  reportType: z.string(),
  reportMessage: z.string(),
  reviewContent: z.string(),
  reportDate: z.string(),
  reportCount: z.number(),
  isHidden: z.boolean()
});

export const ToggleReviewHiddenRequestSchema = z.object({
  isHidden: z.boolean(),
});

export type ReviewReport = z.infer<typeof ReviewReportSchema>;
export type ToggleReviewHiddenRequest = z.infer<typeof ToggleReviewHiddenRequestSchema>;
