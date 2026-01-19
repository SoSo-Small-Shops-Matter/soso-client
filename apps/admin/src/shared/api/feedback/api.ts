import { customFetch } from "@/shared/utils/customFetch";
import { FeedbackSchema } from "./types";

export const feedbackApi = {
  getAll: async () => {
    const response = await customFetch("/admin/feedback");
    return FeedbackSchema.array().parse(response);
  },
};
