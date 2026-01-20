import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shopReportsApi } from "./api";
import type { ToggleShopHiddenRequest } from "./types";

export const shopReportsKeys = {
  all: ["shop-reports"] as const,
  list: () => [...shopReportsKeys.all, "list"] as const,
};


export const useGetShopReports = () => {
  return useQuery({
    queryKey: shopReportsKeys.list(),
    queryFn: shopReportsApi.getAll,
  });
};


export const useToggleShopHidden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, data }: { shopId: number; data: ToggleShopHiddenRequest }) =>
      shopReportsApi.toggleHidden(shopId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopReportsKeys.all });
    },
  });
};
