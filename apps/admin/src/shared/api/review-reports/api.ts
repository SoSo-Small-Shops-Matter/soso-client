import { customFetch } from "@/shared/utils/customFetch";
import { ReviewReportSchema, type ToggleReviewHiddenRequest } from "./types";

export const reviewReportsApi = {
  getAll: async () => {
    const response = await customFetch("/admin/review-reports");
    return ReviewReportSchema.array().parse(response);
  },

  toggleHidden: async (reviewId: number, data: ToggleReviewHiddenRequest) => {
    return customFetch(`/admin/reviews/${reviewId}/hidden`, {
      method: "PATCH",
      body: data,
    });
  },
};
