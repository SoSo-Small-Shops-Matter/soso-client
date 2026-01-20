import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewReportsApi } from "./api";
import type { ToggleReviewHiddenRequest } from "./types";

export const reviewReportsKeys = {
  all: ["review-reports"] as const,
  list: () => [...reviewReportsKeys.all, "list"] as const,
};

export const useGetReviewReports = () => {
  return useQuery({
    queryKey: reviewReportsKeys.list(),
    queryFn: reviewReportsApi.getAll,
  });
};

export const useToggleReviewHidden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: ToggleReviewHiddenRequest }) =>
      reviewReportsApi.toggleHidden(reviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewReportsKeys.all });
    },
  });
};
