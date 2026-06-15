'use client'

import CancelIcon from '@/shared/components/icons/CancelIcon'
import EditIcon from '@/shared/components/icons/EditIcon'
import TextField from '@/shared/components/inputs/TextField'
import { useDialog } from '@/shared/context/DialogContext'
import { useRef, useState } from 'react'

interface CourseNameEditorProps {
  value: string
  onChange: (value: string) => void
}

const MAX_NAME_LENGTH = 30

export default function CourseNameEditor({ value, onChange }: CourseNameEditorProps) {
  const { openDialog, closeDialog } = useDialog()
  const draftRef = useRef(value)

  const handleOpen = () => {
    draftRef.current = value
    openDialog({
      type: 'confirm',
      title: '코스 제목',
      children: (
        <CourseNameInput
          initialValue={value}
          onDraftChange={(v) => {
            draftRef.current = v
          }}
        />
      ),
      leftLabel: '취소',
      rightLabel: '확인',
      onCancel: value ? closeDialog : undefined,
      onConfirm: () => {
        const trimmed = draftRef.current.trim()
        if (!trimmed) return
        onChange(trimmed)
        closeDialog()
      },
    })
  }

  return (
    <button className="flex items-center gap-8 py-4" onClick={handleOpen} aria-label="코스 이름 수정">
      <p className="break-words text-gray-900 font-title_m">
        {value || <span className="text-gray-300">소품샵</span>}
      </p>
      <EditIcon width={'20'} height={'20'} fill="var(--gray-400)" />
    </button>
  )
}

interface CourseNameInputProps {
  initialValue: string
  onDraftChange: (value: string) => void
}

function CourseNameInput({ initialValue, onDraftChange }: CourseNameInputProps) {
  const [draft, setDraft] = useState(initialValue)

  const handleChange = (value: string) => {
    const sliced = value.slice(0, MAX_NAME_LENGTH)
    setDraft(sliced)
    onDraftChange(sliced)
  }

  const handleClear = () => {
    handleChange('')
  }

  return (
    <div className="w-full">
      <TextField
        value={draft}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="코스 이름을 입력해 주세요."
        maxLength={MAX_NAME_LENGTH}
        autoFocus
        rightIcon={
          draft ? (
            <button type="button" onClick={handleClear}>
              <CancelIcon width="24" height="24" fill="var(--gray-200)" />
            </button>
          ) : undefined
        }
      />
      <p className="mt-8 w-full text-right text-gray-300 font-body_s">
        {draft.length}/{MAX_NAME_LENGTH}
      </p>
    </div>
  )
}
