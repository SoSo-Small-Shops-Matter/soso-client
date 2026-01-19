import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionsApi } from "./api";
import type { RejectSubmissionRequest } from "./types";

export const submissionsKeys = {
  all: ["submissions"] as const,
  list: () => [...submissionsKeys.all, "list"] as const,
};


export const useGetAllSubmissions = () => {
  return useQuery({
    queryKey: submissionsKeys.list(),
    queryFn: submissionsApi.getAll,
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
