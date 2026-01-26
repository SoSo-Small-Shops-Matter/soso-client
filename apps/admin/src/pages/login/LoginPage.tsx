import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useAdminLogin } from "@/shared/api/auth/queries";
import { AdminLoginRequestSchema } from "@/shared/api/auth/types";
import { LoginFormInput } from "./components/LoginFormInput";
import { LoginFormStatus } from "./components/LoginFormStatus";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { token } = useAuthStore();
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();

  useEffect(() => {
    if (token) {
      navigate("/users", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    const result = AdminLoginRequestSchema.safeParse({ email, password });

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-12 shadow-lg p-32">
          {/* Title */}
          <div className="text-center mb-32">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              SOSO Admin
            </h1>
            <p className="text-sm text-gray-600">관리자 로그인</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-20">
            <LoginFormInput
              label="이메일"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              error={validationErrors.email}
              required
            />

            <LoginFormInput
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              error={validationErrors.password}
              required
            />

            <LoginFormStatus isError={loginMutation.isError} />

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-main hover:bg-orange-normalHover active:bg-orange-normalActive text-white font-medium py-12 rounded-8"
            >
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
