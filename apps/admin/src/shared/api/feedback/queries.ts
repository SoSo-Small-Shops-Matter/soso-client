import { useQuery } from "@tanstack/react-query";
import { feedbackApi } from "./api";

export const feedbackKeys = {
  all: ["feedback"] as const,
  list: () => [...feedbackKeys.all, "list"] as const,
};

export const useGetAllFeedback = () => {
  return useQuery({
    queryKey: feedbackKeys.list(),
    queryFn: feedbackApi.getAll,
  });
};
