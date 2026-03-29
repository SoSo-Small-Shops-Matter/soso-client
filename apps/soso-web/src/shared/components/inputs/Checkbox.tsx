import clsx from 'clsx'

interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  size?: number
}

const Checkbox = ({ id, checked, onChange, size = 20 }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <label
        htmlFor={id}
        className={clsx(
          'flex cursor-pointer items-center justify-center rounded-full transition-all duration-200',
          checked ? 'bg-main' : 'bg-[#E8EBED]'
        )}
        style={{ width: size, height: size }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3/4 w-3/4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </label>
    </div>
  )
}

export default Checkbox
