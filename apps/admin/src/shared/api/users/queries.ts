import { useQuery } from "@tanstack/react-query";
import { usersApi } from "./api";
import type { UserSortParams } from "./types";
import { MINUTE } from "@repo/utils/formatDateString";

export const usersKeys = {
  all: ["users"] as const,
  list: (active: boolean, params?: UserSortParams) =>
    [...usersKeys.all, "list", active, params] as const,
};

export const useGetActiveUsers = (params?: UserSortParams) => {
  return useQuery({
    queryKey: usersKeys.list(true, params),
    queryFn: () => usersApi.getActiveUsers(params),
    staleTime: 10 * MINUTE
  });
};

export const useGetWithdrawnUsers = (params?: UserSortParams) => {
  return useQuery({
    queryKey: usersKeys.list(false, params),
    queryFn: () => usersApi.getWithdrawnUsers(params),
    staleTime: 10 * MINUTE
  });
};
