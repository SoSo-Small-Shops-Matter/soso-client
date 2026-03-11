import { customFetch } from "@/shared/utils/customFetch";
import { GetActiveUsersResponseSchema, GetWithdrawnUsersResponseSchema, type UserSortParams } from "./types";

export const usersApi = {
  getActiveUsers: async (params?: UserSortParams) => {
    const response = await customFetch<typeof GetActiveUsersResponseSchema>("/admin/users", {
      queryParams: {
        active: true,
        ...params,
      }
    });
    return GetActiveUsersResponseSchema.parse(response.result);
  },
  getWithdrawnUsers: async (params?: UserSortParams) => {
    const response = await customFetch<typeof GetWithdrawnUsersResponseSchema>("/admin/users", {
      queryParams: {
        active: false,
        ...params,
      }
    });
    return GetWithdrawnUsersResponseSchema.parse(response.result);
  }
};
