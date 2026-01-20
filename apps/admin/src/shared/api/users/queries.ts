import { useQuery } from "@tanstack/react-query";
import { usersApi } from "./api";

export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: usersApi.getAll,
  });
};
