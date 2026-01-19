import { customFetch } from "@/shared/utils/customFetch";
import { ShopReportSchema, type ToggleShopHiddenRequest } from "./types";

export const shopReportsApi = {
  getAll: async () => {
    const response = await customFetch("/admin/shop-reports");
    return ShopReportSchema.array().parse(response);
  },

  toggleHidden: async (shopId: number, data: ToggleShopHiddenRequest) => {
    return customFetch(`/admin/shops/${shopId}/hidden`, {
      method: "PATCH",
      body: data,
    });
  },
};
