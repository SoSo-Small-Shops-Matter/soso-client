import { customFetch } from "@/shared/utils/customFetch";
import { GetAllUsersResponseSchema } from "./types";

export const usersApi = {
  getAll: async () => {
    const response = await customFetch("/admin/users");
    return GetAllUsersResponseSchema.parse(response);
  },
};
