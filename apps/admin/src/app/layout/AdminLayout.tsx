import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { useLogout } from "@/shared/api/auth/queries";

const navigation = [
  {
    title: "회원 관리",
    items: [
      { name: "회원 목록", path: "/admin/users" },
      { name: "탈퇴 목록", path: "/admin/users-withdrawn" },
    ],
  },
  {
    title: "소품샵 관리",
    items: [
      { name: "수정 요청 목록", path: "/admin/submissions" },
      { name: "장소 신고 목록", path: "/admin/shop-reports" },
    ],
  },
  {
    title: "리뷰/문의",
    items: [
      { name: "리뷰 신고 목록", path: "/admin/review-reports" },
      { name: "문의 및 피드백", path: "/admin/feedback" },
    ],
  },
];

export function AdminLayout() {
  const handleLogout = useLogout();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-24 py-16">
          <h1 className="text-xl font-bold text-gray-900">SOSO Admin</h1>
          <button
            onClick={handleLogout}
            className="px-16 py-8 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-6 hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="px-24">
          <div className="flex gap-32">
            {navigation.map((section) => {
              const isSectionActive = section.items.some(
                (item) =>
                  location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/"),
              );

              return (
                <div
                  key={section.title}
                  className="flex flex-col items-center gap-16 py-12"
                >
                  <Link
                    to={section.items[0].path}
                    className={`text-sm font-semibold transition-colors ${
                      isSectionActive
                        ? "text-main"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {section.title}
                  </Link>
                  {isSectionActive ? (
                    <div className="flex gap-8">
                      {section.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `px-12 py-6 text-sm rounded-6 transition-colors ${
                              isActive
                                ? "bg-orange-50 text-main font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-24">
        <Outlet />
      </main>
    </div>
  );
}
