import { z } from "zod";

export const SortBy = {
  CREATED: "created",
  LAST_ACTIVE_AT: "lastActiveAt",
} as const;

export const Order = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];
export type Order = (typeof Order)[keyof typeof Order];

export interface UserSortParams {
  sortBy?: SortBy;
  order?: Order;
}

export const ActivityUserSchema = z.object({
  num: z.number(),
  nickName: z.string(),
  createdAt: z.string(),
  lastActivityAt: z.string(),
  provider: z.enum(["apple", "google"]),
});

export const WithdrawalUserSchema = z.object({
  num: z.number(),
  uuid: z.string(),
  nickName: z.nullable(z.string()),
  createdAt: z.string(),
  withdrawalReason: z.string(),
});

export const GetActiveUsersResponseSchema = z.array(ActivityUserSchema)
export const GetWithdrawnUsersResponseSchema = z.array(WithdrawalUserSchema)

export type ActivityUser = z.infer<typeof ActivityUserSchema>;
export type WithdrawalUser = z.infer<typeof WithdrawalUserSchema>;
export type GetActiveUsersResponse = z.infer<typeof GetActiveUsersResponseSchema>;
export type GetWithdrawnUsersResponse = z.infer<typeof GetWithdrawnUsersResponseSchema>;
