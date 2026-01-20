import { z } from "zod";

export const FeedbackSchema = z.object({
  num: z.number(),
  email: z.string(),
  feedback: z.string(),
  createdAt: z.string(),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
