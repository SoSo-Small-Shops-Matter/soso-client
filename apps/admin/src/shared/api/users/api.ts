import { customFetch } from "@/shared/utils/customFetch";
import { GetAllUsersResponseSchema } from "./types";

export const usersApi = {
  getAll: async () => {
    const response = await customFetch<typeof GetAllUsersResponseSchema>("/admin/users");
    // API returns { message, status, result: { activityUsers, withdrawalUsers } }
    return GetAllUsersResponseSchema.parse(response.result);
  },
};
