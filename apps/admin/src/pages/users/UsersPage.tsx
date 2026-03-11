import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetActiveUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import { SortableHeader } from "@/shared/components/SortableHeader";
import {
  type ActivityUser,
  type SortBy,
  type Order,
  SortBy as SortByEnum,
  Order as OrderEnum,
} from "@/shared/api/users/types";
import { getFormatDateString } from "@repo/utils/formatDateString";

export function UsersPage() {
  const [sortBy, setSortBy] = useState<SortBy>(SortByEnum.CREATED);
  const [order, setOrder] = useState<Order>(OrderEnum.DESC);

  const { data, isLoading } = useGetActiveUsers({ sortBy, order });

  const handleSort = (newSortBy: SortBy, newOrder: Order) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const columns: ColumnDef<ActivityUser>[] = [
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
      accessorKey: "nickName",
      header: "닉네임",
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          label="가입일"
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
      accessorKey: "lastActivityAt",
      header: () => (
        <SortableHeader
          label="최근 접속일"
          sortKey={SortByEnum.LAST_ACTIVE_AT}
          currentSortBy={sortBy}
          currentOrder={order}
          onSort={handleSort}
        />
      ),
      cell: ({ getValue }) =>
        getFormatDateString(getValue<string>(), "yyyy.MM.dd"),
    },
    {
      accessorKey: "provider",
      header: "가입 경로",
      size: 120,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-24">회원 목록</h1>
      <Table
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="활동 중인 회원이 없습니다."
      />
    </div>
  );
}
