import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  useGetShopReports,
  useToggleShopHidden,
} from "@/shared/api/shop-reports/queries";
import { Table } from "@/shared/components/Table";
import { FilterTabs } from "@/shared/components/FilterTabs";
import type { ShopReport } from "@/shared/api/shop-reports/types";

const ITEMS_PER_PAGE = 20;

export function ShopReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const { data, isLoading } = useGetShopReports();
  const toggleMutation = useToggleShopHidden();

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (visibilityFilter === "all") return data;
    if (visibilityFilter === "visible") return data.filter((r) => !r.isHidden);
    if (visibilityFilter === "hidden") return data.filter((r) => r.isHidden);
    return data;
  }, [data, visibilityFilter]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  }, [filteredData]);

  const handleToggle = (shopId: number, currentlyHidden: boolean) => {
    toggleMutation.mutate({ shopId, data: { isHidden: !currentlyHidden } });
  };

  const columns = useMemo<ColumnDef<ShopReport>[]>(
    () => [
      {
        accessorKey: "num",
        header: "ID",
        size: 80,
      },
      {
        accessorKey: "userEmail",
        header: "이메일",
      },
      {
        accessorKey: "shopName",
        header: "장소명",
      },
      {
        accessorKey: "shopLocation",
        header: "주소",
      },
      {
        accessorKey: "reportType",
        header: "신고 사유",
      },
      {
        accessorKey: "reportDate",
        header: "신고 날짜",
        cell: ({ getValue }) =>
          new Date(getValue<string>()).toLocaleDateString("ko-KR"),
      },
      {
        accessorKey: "reportCount",
        header: "누적 횟수",
        size: 100,
      },
      {
        id: "actions",
        header: "관리",
        size: 120,
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(row.original.shopId, row.original.isHidden);
            }}
            disabled={toggleMutation.isPending}
            className={`px-12 py-6 text-sm rounded-6 transition-colors ${
              row.original.isHidden
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            } disabled:opacity-50`}
          >
            {row.original.isHidden ? "노출" : "비노출"}
          </button>
        ),
      },
    ],
    [toggleMutation.isPending],
  );

  const tabs = [
    { label: "전체", value: "all" },
    { label: "노출", value: "visible" },
    { label: "비노출", value: "hidden" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">장소 신고 목록</h1>

      <FilterTabs
        tabs={tabs}
        activeTab={visibilityFilter}
        onChange={setVisibilityFilter}
      />

      <Table
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        emptyMessage="신고된 장소가 없습니다."
      />
    </div>
  );
}
