import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllSubmissions } from "@/shared/api/submissions/queries";
import { Table } from "@/shared/components/Table";
import type {
  SubmissionType,
  SubmissionStatus,
  AllSubmission,
} from "@/shared/api/submissions/types";
import { getFormatDateString } from "@repo/utils/formatDateString";
import { SubmissionDetailModal } from "./components/SubmissionDetailModal";

export function SubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] =
    useState<AllSubmission | null>(null);
  const { data, isLoading } = useGetAllSubmissions();

  //TODO: API 필터링 추가되면 수정
  const allSubmissions = data ? Object.values(data).flat() : [];

  const categoryMap: Record<SubmissionType, string> = {
    new_shop: "새 소품샵",
    new_product: "상품 추가",
    new_operating: "운영시간",
  };

  const statusMap: Record<SubmissionStatus, string> = {
    pending: "대기중",
    approved: "승인됨",
    rejected: "반려됨",
  };

  const columns: ColumnDef<AllSubmission>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "type",
      header: "카테고리",
      size: 120,
      cell: ({ getValue }) => {
        return categoryMap[getValue<SubmissionType>()];
      },
    },
    {
      id: "email",
      header: "이메일",
      accessorFn: (row) => row.user.email,
    },
    {
      id: "shopName",
      header: "장소명",
      accessorFn: (row) => row.shop.name,
    },
    {
      id: "location",
      header: "주소",
      accessorFn: (row) => row.shop.location,
    },
    {
      accessorKey: "createdAt",
      header: "등록 날짜",
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "status",
      header: "상태",
      size: 100,
      cell: ({ getValue }) => {
        return statusMap[getValue<SubmissionStatus>()];
      },
    },
  ];

  const onModalClose = () => {
    setSelectedSubmission(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">수정 요청 목록</h1>

      <Table
        data={allSubmissions || []}
        columns={columns}
        onRowClick={setSelectedSubmission}
        isLoading={isLoading}
        emptyMessage="수정 요청이 없습니다."
      />

      {/* Detail Modal */}
      <SubmissionDetailModal
        onClose={onModalClose}
        submission={selectedSubmission}
        categoryMap={categoryMap}
        statusMap={statusMap}
      />
    </div>
  );
}
