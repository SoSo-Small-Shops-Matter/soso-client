import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import type { WithdrawalUser } from "@/shared/api/users/types";

const ITEMS_PER_PAGE = 20;

export function WithdrawnUsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllUsers();

  if (!data?.withdrawalUsers) return null; // or loading state handled by Table

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.withdrawalUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(data.withdrawalUsers.length / ITEMS_PER_PAGE);

  const columns: ColumnDef<WithdrawalUser>[] = [
    {
      accessorKey: "num",
      header: "ID",
      size: 80,
    },
    {
      accessorKey: "email",
      header: "이메일",
    },
    {
      accessorKey: "createdAt",
      header: "탈퇴일",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("ko-KR"),
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
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        emptyMessage="탈퇴한 회원이 없습니다."
      />
    </div>
  );
}
