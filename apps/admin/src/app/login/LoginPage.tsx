import { useState } from "react";
import type { LoginFormData } from "@/shared/types/auth";

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-16 shadow-button p-32">
          <div className="text-center mb-32">
            <h1 className="font-header1 text-black mb-8">SoSo Admin</h1>
            <p className="font-body2_m text-gray-500">관리자 로그인</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-20">
            <div>
              <label
                htmlFor="username"
                className="block font-body1_m text-gray-800 mb-8"
              >
                아이디
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-16 py-12 border border-gray-200 rounded-8 font-body2_m focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-body1_m text-gray-800 mb-8"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-16 py-12 border border-gray-200 rounded-8 font-body2_m focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-main hover:bg-orange-normalHover active:bg-orange-normalActive text-white font-body1_bold py-14 rounded-8 transition-colors duration-200"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
