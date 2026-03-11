import { customFetch } from "@/shared/utils/customFetch";
import { NewOperatingSubmissionsResponse, NewOperatingSubmissionsResponseSchema, NewProductSubmissionsResponse, NewProductSubmissionsResponseSchema, NewShopSubmissionsResponse, NewShopSubmissionsResponseSchema, type RejectSubmissionRequest } from "./types";
import type { Order, SortBy } from "@/shared/api/users/types";

export interface SubmissionSortParams {
  sortBy?: SortBy;
  order?: Order;
}

export const submissionsApi = {
  getNewShopSubmissions: async ({ sortBy, order }: SubmissionSortParams = {}) => {
    const response = await customFetch<NewShopSubmissionsResponse>("/admin/submission", {
      queryParams: { type: 'shop', ...(sortBy && { sortBy }), ...(order && { order }) }
    });
    return NewShopSubmissionsResponseSchema.parse(response.result || response);
  },

  getNewProductSubmissions: async ({ sortBy, order }: SubmissionSortParams = {}) => {
    const response = await customFetch<NewProductSubmissionsResponse>("/admin/submission", {
      queryParams: { type: 'product', ...(sortBy && { sortBy }), ...(order && { order }) }
    });
    return NewProductSubmissionsResponseSchema.parse(response.result || response);
  },

  getNewOperatingSubmissions: async ({ sortBy, order }: SubmissionSortParams = {}) => {
    const response = await customFetch<NewOperatingSubmissionsResponse>("/admin/submission", {
      queryParams: { type: 'operate', ...(sortBy && { sortBy }), ...(order && { order }) }
    });
    return NewOperatingSubmissionsResponseSchema.parse(response.result || response);
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
