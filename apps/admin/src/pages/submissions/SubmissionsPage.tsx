import { useSearchParams } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import {
  type SubmissionType,
  type SubmissionStatus,
  type AllSubmission,
} from "@/shared/api/submissions/types";
import { getFormatDateString } from "@repo/utils/formatDateString";
import { NewShopTable } from "./components/NewShop/Table";
import { NewProductTable } from "./components/NewProduct/Table";
import { NewOperationTable } from "./components/NewOperation/Table";
import { categoryMap, statusMap } from "./constants";

const filterOptions: { label: string; value: SubmissionType }[] = [
  { label: "새 소품샵", value: "new_shop" },
  { label: "상품 추가", value: "new_product" },
  { label: "운영시간", value: "new_operating" },
];

export function SubmissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get("type") as SubmissionType | null;
  const activeFilter =
    typeParam && filterOptions.some((opt) => opt.value === typeParam)
      ? typeParam
      : "new_shop";

  const setActiveFilter = (type: SubmissionType) => {
    setSearchParams({ type });
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

      {activeFilter === "new_shop" && <NewShopTable columns={columns as any} />}
      {activeFilter === "new_product" && (
        <NewProductTable columns={columns as any} />
      )}
      {activeFilter === "new_operating" && (
        <NewOperationTable columns={columns as any} />
      )}
    </div>
  );
}
