import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetWithdrawnUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import { SortableHeader } from "@/shared/components/SortableHeader";
import {
  type WithdrawalUser,
  type SortBy,
  type Order,
  SortBy as SortByEnum,
  Order as OrderEnum,
} from "@/shared/api/users/types";
import { getFormatDateString } from "@repo/utils/formatDateString";

export function WithdrawnUsersPage() {
  const [sortBy, setSortBy] = useState<SortBy>(SortByEnum.CREATED);
  const [order, setOrder] = useState<Order>(OrderEnum.DESC);

  const { data, isLoading } = useGetWithdrawnUsers({ sortBy, order });

  const handleSort = (newSortBy: SortBy, newOrder: Order) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const columns: ColumnDef<WithdrawalUser>[] = [
    {
      accessorKey: "num",
      header: "ID",
      size: 20,
    },
    {
      accessorKey: "uuid",
      header: "UUID",
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          label="탈퇴일"
          sortKey={SortByEnum.CREATED}
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
      ),
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "withdrawalReason",
      header: "탈퇴 사유",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">탈퇴 목록</h1>
      <Table
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="탈퇴한 회원이 없습니다."
      />
    </div>
  );
}
