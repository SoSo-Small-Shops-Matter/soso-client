/**
 * Admin API Types
 * 관리자 페이지 전용 타입 정의
 */

// ============================================================================
// Admin Login
// ============================================================================

export interface AdminLoginDto {
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    accessToken: string;
    refreshToken: string;
}

// ============================================================================
// Users Management
// ============================================================================

export interface ActivityUserResponseDto {
    num: number;
    email: string;
    nickName: string;
    createdAt: string;
    lastActivityAt: string;
    provider: string;
}

export interface WithdrawalUserResponseDto {
    num: number;
    email: string;
    nickName: string;
    createdAt: string;
    withdrawalReason: string;
}

export interface GetAllUsersResponseDto {
    activityUsers: ActivityUserResponseDto[];
    withdrawalUsers: WithdrawalUserResponseDto[];
}

// ============================================================================
// Shop Reports
// ============================================================================

export interface GetAllShopReportResponseDto {
    num: number;
    userEmail: string;
    shopId: number;
    shopName: string;
    shopLocation: string;
    reportType: string;
    reportCount: number;
    reportDate: string;
    isHidden: boolean;
}

export interface ToggleShopHiddenDto {
    isHidden: boolean;
}

// ============================================================================
// Review Reports
// ============================================================================

export interface GetAllReviewReportResponseDto {
    num: number;
    userEmail: string;
    reportType: string;
    reportMessage: string;
    reviewContent: string;
    reportDate: string;
    reportCount: number;
}

export interface ToggleReviewHiddenDto {
    isHidden: boolean;
}

// ============================================================================
// Submissions
// ============================================================================

export type SubmissionType = "new_shop" | "new_product" | "new_operating";
export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface SubmissionUserResponseDto {
    uuid: string;
    email: string;
    profileImg: string | null;
    nickName: string;
    lastActivityAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubmissionShopOperatingHourResponseDto {
    id: number;
    isVerified: boolean;
    phoneNumber: string | null;
    daysOfWeek: string[][];
    startTime: string;
    endTime: string;
}

export interface SubmissionProductResponseDto {
    id: number;
    name: string;
}

export interface SubmissionShopProductMappingResponseDto {
    id: number;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    product: SubmissionProductResponseDto;
}

export interface SubmissionShopResponseDto {
    id: number;
    name: string;
    mainImage: string | null;
    isVerified: boolean;
    instagram: string | null;
    lat: number;
    lng: number;
    location: string;
    createdAt: string;
    updatedAt: string;
    operatingHours?: SubmissionShopOperatingHourResponseDto[];
    productMappings?: SubmissionShopProductMappingResponseDto[];
}

export interface NewShopSubmissionResponseDto {
    id: number;
    type: SubmissionType;
    status: SubmissionStatus;
    rejectMessage: string | null;
    createdAt: string;
    shop: SubmissionShopResponseDto;
    user: SubmissionUserResponseDto;
}

export interface NewProductSubmissionResponseDto {
    id: number;
    type: SubmissionType;
    status: SubmissionStatus;
    rejectMessage: string | null;
    createdAt: string;
    shop: SubmissionShopResponseDto;
    shopProducts: SubmissionShopProductMappingResponseDto[];
    user: SubmissionUserResponseDto;
}

export interface NewOperatingSubmissionResponseDto {
    id: number;
    type: SubmissionType;
    status: SubmissionStatus;
    rejectMessage: string | null;
    createdAt: string;
    shop: SubmissionShopResponseDto;
    shopOperatingHour: SubmissionShopOperatingHourResponseDto;
    user: SubmissionUserResponseDto;
}

export interface GetAllSubmissionsForAdminResponseDto {
    newShopSubmissions: NewShopSubmissionResponseDto[];
    newProductSubmissions: NewProductSubmissionResponseDto[];
    newOperatingSubmissions: NewOperatingSubmissionResponseDto[];
}

export interface RejectSubmissionDto {
    rejectMessage?: string;
}

// ============================================================================
// Feedback
// ============================================================================

export interface GetAllFeedbacksResponseDto {
    num: number;
    email: string;
    feedback: string;
    createdAt: string;
}

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface SuccessResponse<T> {
    message: string;
    status: number;
    result: T;
}

export interface ErrorResponse {
    message: string;
    status: number;
    data?: unknown;
}
