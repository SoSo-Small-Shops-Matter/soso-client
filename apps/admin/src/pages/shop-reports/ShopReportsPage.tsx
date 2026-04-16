import type { ColumnDef } from "@tanstack/react-table";
import {
  useGetShopReports,
  useToggleShopHidden,
} from "@/shared/api/shop-reports/queries";
import { Table } from "@/shared/components/Table";
import { HiddenToggleButton } from "@/shared/components/HiddenToggleButton";
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
        <HiddenToggleButton
          id={row.original.shopId}
          isHidden={row.original.isHidden}
          isPending={toggleMutation.isPending}
          onToggle={handleToggle}
        />
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
