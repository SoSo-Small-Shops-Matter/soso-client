import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function LoginFormInput({ label, error, className, ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-8 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-16 py-12 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-8 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${className}`}
      />
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
