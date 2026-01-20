interface LoginFormStatusProps {
  isError: boolean;
}

export function LoginFormStatus({ isError }: LoginFormStatusProps) {
  if (!isError) return null;

  return (
    <div className="p-12 bg-red-50 border border-red-200 rounded-8">
      <p className="text-sm text-red-600">
        로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
      </p>
    </div>
  );
}
