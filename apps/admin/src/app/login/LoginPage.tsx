import { useState } from "react";
import type { LoginFormData } from "@/shared/types/auth";
import { useAdminLogin } from "@/shared/api/auth/queries";
import { AdminLoginRequestSchema } from "@/shared/api/auth/types";

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const loginMutation = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Validate with Zod
    const result = AdminLoginRequestSchema.safeParse({
      email: formData.username,
      password: formData.password,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    loginMutation.mutate(result.data);
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
                className={`w-full px-16 py-14 border ${validationErrors.email ? "border-red-500" : "border-gray-300"} rounded-8 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent`}
                placeholder="이메일을 입력하세요"
                required
              />
              {validationErrors.email && (
                <p className="mt-4 text-sm text-red-500">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-24">
              <label
                htmlFor="password"
                className="block mb-8 text-body2_bold text-gray-700"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-16 py-14 border ${validationErrors.password ? "border-red-500" : "border-gray-300"} rounded-8 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent`}
                placeholder="비밀번호를 입력하세요"
                required
              />
              {validationErrors.password && (
                <p className="mt-4 text-sm text-red-500">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {loginMutation.isError && (
              <div className="mb-16 p-12 bg-red-50 border border-red-200 rounded-8">
                <p className="text-sm text-red-600">
                  로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mb-24">
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-main hover:bg-orange-normalHover active:bg-orange-normalActive text-white font-body1_bold py-14 rounded-8 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
