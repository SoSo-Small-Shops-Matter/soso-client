import type { ColumnDef } from "@tanstack/react-table";
import {
  useGetShopReports,
  useToggleShopHidden,
} from "@/shared/api/shop-reports/queries";
import { Table } from "@/shared/components/Table";
import type { ShopReport } from "@/shared/api/shop-reports/types";
import { getFormatDateString } from "@repo/utils/formatDateString";

export function ShopReportsPage() {
  const { data, isLoading } = useGetShopReports();
  const toggleMutation = useToggleShopHidden();

  const handleToggle = (shopId: number, currentlyHidden: boolean) => {
    toggleMutation.mutate({ shopId, data: { isHidden: !currentlyHidden } });
  };

  const columns: ColumnDef<ShopReport>[] = [
    {
      accessorKey: "num",
      header: "ID",
      size: 20,
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
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
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
          {row.original.isHidden ? "노출하기" : "숨기기"}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">장소 신고 목록</h1>

      <Table
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="신고된 장소가 없습니다."
      />
    </div>
  );
}
