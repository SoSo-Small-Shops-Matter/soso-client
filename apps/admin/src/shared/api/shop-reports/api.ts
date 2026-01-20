import { customFetch } from "@/shared/utils/customFetch";
import { ShopReportSchema, type ToggleShopHiddenRequest, type ShopReport } from "./types";

export const shopReportsApi = {
  getAll: async () => {
    const response = await customFetch<ShopReport[]>("/admin/shop-reports");
    return ShopReportSchema.array().parse(response.result || response);
  },

  toggleHidden: async (shopId: number, data: ToggleShopHiddenRequest) => {
    return customFetch(`/admin/shops/${shopId}/hidden`, {
      method: "PATCH",
      body: data,
    });
  },
};
