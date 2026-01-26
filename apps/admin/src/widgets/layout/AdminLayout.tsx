import { Outlet } from "react-router-dom";
import { useLogout } from "@/shared/api/auth/queries";
import { AdminHeader } from "./components/AdminHeader";
import { AdminNav } from "./components/AdminNav";
import { NavSection } from "./components/NavSection";

const navigation: NavSection[] = [
  {
    title: "회원 관리",
    items: [
      { name: "회원 목록", path: "/users" },
      { name: "탈퇴 목록", path: "/users-withdrawn" },
    ],
  },
  {
    title: "소품샵 관리",
    items: [
      { name: "수정 요청 목록", path: "/submissions" },
      { name: "장소 신고 목록", path: "/shop-reports" },
    ],
  },
  {
    title: "리뷰/문의",
    items: [
      { name: "리뷰 신고 목록", path: "/review-reports" },
      { name: "문의 및 피드백", path: "/feedback" },
    ],
  },
];

export function AdminLayout() {
  const handleLogout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />
      <AdminNav navigation={navigation} />

      {/* Main Content */}
      <main className="p-24">
        <Outlet />
      </main>
    </div>
  );
}
