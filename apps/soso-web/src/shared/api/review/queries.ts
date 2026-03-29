import { useMutation } from '@tanstack/react-query';
import { reviewApi } from './api';
import type { PatchReviewRequestType, PostReviewReportRequest, ReviewRequestType } from './types';

export const usePostReviewMutation = () =>
  useMutation({
    mutationKey: ['postReview'],
    mutationFn: (data: ReviewRequestType) => reviewApi.postReview(data),
  });

export const usePatchReviewMutation = () =>
  useMutation({
    mutationKey: ['patchReview'],
    mutationFn: (data: PatchReviewRequestType) => reviewApi.patchReview(data),
  });

export const useDeleteReviewMutation = () =>
  useMutation({
    mutationKey: ['deleteReview'],
    mutationFn: (data: { shopId: number; reviewId: number }) => reviewApi.deleteReview(data),
  });

export const usePostReviewReportMutation = () =>
  useMutation({
    mutationKey: ['postReviewReport'],
    mutationFn: (data: PostReviewReportRequest) => reviewApi.postReviewReport(data),
  });
