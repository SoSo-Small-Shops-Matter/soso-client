import { customFetch } from "@/shared/utils/customFetch";
import { GetAllSubmissionsResponseSchema, type RejectSubmissionRequest, type GetAllSubmissionsResponse } from "./types";

export const submissionsApi = {
  getAll: async () => {
    const response = await customFetch<GetAllSubmissionsResponse>("/admin/submission");
    return GetAllSubmissionsResponseSchema.parse(response.result || response);
  },

  // Product submissions
  acceptProduct: async (submissionId: number) => {
    return customFetch(`/admin/submission/${submissionId}/product/accept`, {
      method: "PATCH",
    });
  },

  rejectProduct: async (submissionId: number, data: RejectSubmissionRequest) => {
    return customFetch(`/admin/submission/${submissionId}/product/reject`, {
      method: "PATCH",
      body: data,
    });
  },

  // Operating info submissions
  acceptOperatingInfo: async (submissionId: number) => {
    return customFetch(`/admin/submission/${submissionId}/operating-info/accept`, {
      method: "PATCH",
    });
  },

  rejectOperatingInfo: async (submissionId: number, data: RejectSubmissionRequest) => {
    return customFetch(`/admin/submission/${submissionId}/operating-info/reject`, {
      method: "PATCH",
      body: data,
    });
  },

  // New shop submissions
  acceptNewShop: async (submissionId: number) => {
    return customFetch(`/admin/submission/${submissionId}/new-shop/accept`, {
      method: "PATCH",
    });
  },

  rejectNewShop: async (submissionId: number, data: RejectSubmissionRequest) => {
    return customFetch(`/admin/submission/${submissionId}/new-shop/reject`, {
      method: "PATCH",
      body: data,
    });
  },
};
