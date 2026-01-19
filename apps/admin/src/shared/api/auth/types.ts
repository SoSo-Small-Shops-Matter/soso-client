import { z } from "zod";

export const AdminLoginRequestSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type AdminLoginRequest = z.infer<typeof AdminLoginRequestSchema>;


export const AdminLoginResponseSchema = z.object({
  message: z.string(),
  status: z.number(),
  result: z.string(),
});

export type AdminLoginResponse = z.infer<typeof AdminLoginResponseSchema>;
