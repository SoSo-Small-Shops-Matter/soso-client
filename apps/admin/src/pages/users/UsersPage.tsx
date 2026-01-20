import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useGetAllUsers } from "@/shared/api/users/queries";
import { Table } from "@/shared/components/Table";
import type { ActivityUser } from "@/shared/api/users/types";

const ITEMS_PER_PAGE = 20;

export function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllUsers();

  const paginatedData = data?.activityUsers
    ? data.activityUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      )
    : [];

  const totalPages = data?.activityUsers
    ? Math.ceil(data.activityUsers.length / ITEMS_PER_PAGE)
    : 1;

  const columns: ColumnDef<ActivityUser>[] = [
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
      accessorKey: "nickName",
      header: "닉네임",
    },
    {
      accessorKey: "createdAt",
      header: "가입일",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("ko-KR"),
    },
    {
      accessorKey: "lastActivityAt",
      header: "최근 접속일",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("ko-KR"),
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
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        emptyMessage="활동 중인 회원이 없습니다."
      />
    </div>
  );
}
