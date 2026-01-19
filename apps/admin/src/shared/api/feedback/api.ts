import { customFetch } from "@/shared/utils/customFetch";
import { FeedbackSchema, type Feedback } from "./types";

export const feedbackApi = {
  getAll: async () => {
    const response = await customFetch<Feedback[]>("/admin/feedback");
    return FeedbackSchema.array().parse(response.result || response);
  },
};
