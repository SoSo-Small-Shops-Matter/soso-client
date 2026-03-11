import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import {
  type SubmissionType,
  type SubmissionStatus,
  type AllSubmission,
} from "@/shared/api/submissions/types";
import { getFormatDateString } from "@repo/utils/formatDateString";
import { SubmissionDetailModal } from "./components/SubmissionDetailModal";
import { SubmissionNewShopTable } from "./components/SubmissionNewShopTable";
import { SubmissionNewProductTable } from "./components/SubmissionNewProductTable";
import { SubmissionNewOperationTable } from "./components/SubmissionNewOperationTable";

const filterOptions: { label: string; value: SubmissionType }[] = [
  { label: "새 소품샵", value: "new_shop" },
  { label: "상품 추가", value: "new_product" },
  { label: "운영시간", value: "new_operating" },
];

export interface SubTableProps {
  columns: ColumnDef<AllSubmission>[];
  onSelect: (submission: AllSubmission) => void;
}

export function SubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type") as SubmissionType | null;
  const activeFilter =
    typeParam && filterOptions.some((opt) => opt.value === typeParam)
      ? typeParam
      : "new_shop";

  const [selectedSubmission, setSelectedSubmission] =
    useState<AllSubmission | null>(null);

  const setActiveFilter = (type: SubmissionType) => {
    setSearchParams({ type });
  };

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
      accessorFn: (row) => row.shop?.name || "-",
    },
    {
      id: "location",
      header: "주소",
      accessorFn: (row) => row.shop?.location || "-",
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

      <div className="flex gap-8 mb-16">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={`px-16 py-8 rounded-full text-sm font-medium transition-colors ${
              activeFilter === option.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {activeFilter === "new_shop" && (
        <SubmissionNewShopTable
          columns={columns}
          onSelect={setSelectedSubmission}
        />
      )}
      {activeFilter === "new_product" && (
        <SubmissionNewProductTable
          columns={columns}
          onSelect={setSelectedSubmission}
        />
      )}
      {activeFilter === "new_operating" && (
        <SubmissionNewOperationTable
          columns={columns}
          onSelect={setSelectedSubmission}
        />
      )}

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
