'use client'

import Button from '@/shared/components/button/Button'
import TextButton from '@/shared/components/button/TextButton'
import IconButton from '@/shared/components/button/IconButton'
import SearchIcon from '@/shared/components/icons/SearchIcon'
import XIcon from '@/shared/components/icons/XIcon'

const ICON = <SearchIcon fill="currentColor" />
const X_ICON = <XIcon width="16" height="16" fill="currentColor" />

export default function ButtonTestPage() {
  return (
    <div className="-mt-56 space-y-40 px-20 py-20">
      {/* ─── Button ─────────────────────────── */}
      <section>
        <h2 className="mb-16 font-title_s">Button</h2>

        {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
          <div key={variant} className="mb-24">
            <h3 className="mb-8 text-gray-500 font-subtitle_m">{variant}</h3>

            {/* Filled */}
            <p className="mb-4 text-gray-400 font-caption">filled</p>
            <div className="mb-12 flex flex-wrap gap-8">
              {(['xLarge', 'large', 'medium', 'small'] as const).map((size) => (
                <Button key={size} title={size} variant={variant} size={size} width="auto" />
              ))}
              <Button title="disabled" variant={variant} size="medium" width="auto" disabled />
            </div>

            {/* Outlined */}
            <p className="mb-4 text-gray-400 font-caption">outlined</p>
            <div className="mb-12 flex flex-wrap gap-8">
              {(['xLarge', 'large', 'medium', 'small'] as const).map((size) => (
                <Button key={size} title={size} variant={variant} size={size} width="auto" outlined />
              ))}
              <Button title="disabled" variant={variant} size="medium" width="auto" outlined disabled />
            </div>

            {/* With icons */}
            <p className="mb-4 text-gray-400 font-caption">with icons</p>
            <div className="flex flex-wrap gap-8">
              <Button title="left icon" variant={variant} size="medium" width="auto" leftIcon={ICON} />
              <Button title="right icon" variant={variant} size="medium" width="auto" rightIcon={ICON} />
              <Button title="both" variant={variant} size="medium" width="auto" leftIcon={ICON} rightIcon={X_ICON} />
              <Button title="outlined" variant={variant} size="medium" width="auto" outlined leftIcon={ICON} />
            </div>
          </div>
        ))}
      </section>

      {/* ─── TextButton ─────────────────────── */}
      <section>
        <h2 className="mb-16 font-title_s">TextButton</h2>

        {(['primary', 'tertiary'] as const).map((variant) => (
          <div key={variant} className="mb-24">
            <h3 className="mb-8 text-gray-500 font-subtitle_m">{variant}</h3>

            <div className="mb-12 flex flex-wrap items-center gap-12">
              {(['large', 'medium', 'small'] as const).map((size) => (
                <TextButton key={size} label={size} variant={variant} size={size} />
              ))}
              <TextButton label="disabled" variant={variant} size="medium" disabled />
            </div>

            <p className="mb-4 text-gray-400 font-caption">with icons</p>
            <div className="flex flex-wrap items-center gap-12">
              <TextButton label="left icon" variant={variant} size="medium" leftIcon={ICON} />
              <TextButton label="right icon" variant={variant} size="medium" rightIcon={ICON} />
              <TextButton label="both" variant={variant} size="medium" leftIcon={ICON} rightIcon={X_ICON} />
            </div>
          </div>
        ))}
      </section>

      {/* ─── IconButton ─────────────────────── */}
      <section>
        <h2 className="mb-16 font-title_s">IconButton</h2>

        {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
          <div key={variant} className="mb-24">
            <h3 className="mb-8 text-gray-500 font-subtitle_m">{variant}</h3>

            <div className="flex flex-wrap items-center gap-8">
              {(['large', 'medium', 'small'] as const).map((size) => (
                <IconButton key={size} icon={ICON} label={size} variant={variant} size={size} />
              ))}
              <IconButton icon={ICON} label="disabled" variant={variant} size="medium" disabled />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
