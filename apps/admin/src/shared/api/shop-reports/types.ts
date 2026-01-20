import { z } from "zod";

export const ShopReportSchema = z.object({
  num: z.number(),
  userEmail: z.string(),
  shopId: z.number(),
  shopName: z.string(),
  shopLocation: z.string(),
  reportType: z.string(),
  reportCount: z.number(),
  reportDate: z.string(),
  isHidden: z.boolean(),
});

export const ToggleShopHiddenRequestSchema = z.object({
  isHidden: z.boolean(),
});

export type ShopReport = z.infer<typeof ShopReportSchema>;
export type ToggleShopHiddenRequest = z.infer<typeof ToggleShopHiddenRequestSchema>;
