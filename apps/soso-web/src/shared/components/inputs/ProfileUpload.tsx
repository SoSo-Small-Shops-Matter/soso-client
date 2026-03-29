import UploadIcon from '@/shared/components/inputs/ProfileUpload/components/UploadIcon'
import ProfileImage from '@/shared/components/ui/ProfileImage'
import { useSingleFileUpload } from '@/shared/hooks/useFileUpload'
import { ChangeEvent } from 'react'

interface ProfileUploadProps {
  prevImage?: string
  preview: string | null
  setSingleFile: (file: File) => void
}

export default function ProfileUpload({ prevImage, preview, setSingleFile }: ProfileUploadProps) {
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSingleFile(e.target.files[0])
  }

  return (
    <div>
      <input id="profile-upload" type="file" className="hidden" onChange={handleChangeFile} accept="image/*" />
      <div className="relative">
        <ProfileImage size={82} imgUrl={preview || prevImage} />
        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 cursor-pointer">
          <UploadIcon />
        </label>
      </div>
    </div>
  )
}
