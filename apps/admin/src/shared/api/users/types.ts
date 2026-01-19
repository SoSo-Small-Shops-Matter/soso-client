import { z } from "zod";

export const ActivityUserSchema = z.object({
  num: z.number(),
  email: z.string(),
  nickName: z.string(),
  createdAt: z.string(),
  lastActivityAt: z.string(),
  provider: z.string(),
});

export const WithdrawalUserSchema = z.object({
  num: z.number(),
  email: z.string(),
  nickName: z.string(),
  createdAt: z.string(),
  withdrawalReason: z.string(),
});

export const GetAllUsersResponseSchema = z.object({
  activityUsers: z.array(ActivityUserSchema),
  withdrawalUsers: z.array(WithdrawalUserSchema),
});

export type ActivityUser = z.infer<typeof ActivityUserSchema>;
export type WithdrawalUser = z.infer<typeof WithdrawalUserSchema>;
export type GetAllUsersResponse = z.infer<typeof GetAllUsersResponseSchema>;
