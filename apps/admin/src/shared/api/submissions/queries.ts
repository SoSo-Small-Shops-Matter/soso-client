import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionsApi } from "./api";
import type { RejectSubmissionRequest } from "./types";
import { MINUTE } from "@repo/utils/formatDateString";
import type { Order, SortBy } from "@/shared/api/users/types";

export const submissionsKeys = {
  all: ["submissions"] as const,
  newShop: (sortBy?: SortBy, order?: Order) =>
    [...submissionsKeys.all, "newShop", sortBy, order] as const,
  newProduct: (sortBy?: SortBy, order?: Order) =>
    [...submissionsKeys.all, "newProduct", sortBy, order] as const,
  newOperating: (sortBy?: SortBy, order?: Order) =>
    [...submissionsKeys.all, "newOperating", sortBy, order] as const,
};

export interface SubmissionQuerySortParams {
  sortBy?: SortBy;
  order?: Order;
}

export const useGetNewShopSubmissions = ({ sortBy, order }: SubmissionQuerySortParams = {}) => {
  return useQuery({
    queryKey: submissionsKeys.newShop(sortBy, order),
    queryFn: () => submissionsApi.getNewShopSubmissions({ sortBy, order }),
    staleTime: 10 * MINUTE,
  });
};

export const useGetNewProductSubmissions = ({ sortBy, order }: SubmissionQuerySortParams = {}) => {
  return useQuery({
    queryKey: submissionsKeys.newProduct(sortBy, order),
    queryFn: () => submissionsApi.getNewProductSubmissions({ sortBy, order }),
    staleTime: 10 * MINUTE,
  });
};

export const useGetNewOperatingSubmissions = ({ sortBy, order }: SubmissionQuerySortParams = {}) => {
  return useQuery({
    queryKey: submissionsKeys.newOperating(sortBy, order),
    queryFn: () => submissionsApi.getNewOperatingSubmissions({ sortBy, order }),
    staleTime: 10 * MINUTE,
  });
};

export const useAcceptProductSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: number) => submissionsApi.acceptProduct(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};

export const useRejectProductSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: number;
      data: RejectSubmissionRequest;
    }) => submissionsApi.rejectProduct(submissionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};

export const useAcceptOperatingInfoSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: number) => submissionsApi.acceptOperatingInfo(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};

export const useRejectOperatingInfoSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: number;
      data: RejectSubmissionRequest;
    }) => submissionsApi.rejectOperatingInfo(submissionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};

export const useAcceptNewShopSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submissionId: number) => submissionsApi.acceptNewShop(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};

export const useRejectNewShopSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: number;
      data: RejectSubmissionRequest;
    }) => submissionsApi.rejectNewShop(submissionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionsKeys.all });
    },
  });
};
