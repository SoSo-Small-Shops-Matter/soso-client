interface Props {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: Props) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-24 py-16">
        <h1 className="text-xl font-bold text-gray-900">SOSO Admin</h1>
        <button
          onClick={onLogout}
          className="px-16 py-8 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-6 hover:bg-gray-50"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
