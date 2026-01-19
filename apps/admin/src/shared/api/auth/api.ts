import { customFetch } from "@/shared/utils/customFetch";
import { AdminLoginRequest, AdminLoginResponseSchema } from "./types";

export const authApi = {
  login: async (data: AdminLoginRequest) => {
    const response = await customFetch("/admin/login", {
      method: "POST",
      body: data,
    });
    return AdminLoginResponseSchema.parse(response);
  },
};
