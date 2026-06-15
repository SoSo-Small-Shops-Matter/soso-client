import Image from 'next/image'

interface CourseThumbnailProps {
  thumbnails: string[]
  alt: string
}

export default function CourseThumbnail({ thumbnails, alt }: CourseThumbnailProps) {
  if (thumbnails.length === 0) {
    return <div className="h-56 w-56 flex-shrink-0 rounded-10 bg-gray-100" />
  }

  if (thumbnails.length === 1) {
    return (
      <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-10 bg-gray-100">
        <Image src={thumbnails[0]} alt={alt} width={52} height={52} className="h-full w-full object-cover" />
        <div className="absolute inset-0 rounded-10 border border-[#191919]/10" />
      </div>
    )
  }

  const positions = ['left-0 top-0', 'bottom-0 right-0 z-[1]'] as const

  return (
    <div className="relative h-56 w-56 flex-shrink-0">
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} h-36 w-36 overflow-hidden rounded-10 border-2 border-white bg-gray-100`}
        >
          <Image src={thumbnails[i]} alt={alt} width={36} height={36} className="h-full w-full object-cover" />
          <div className="absolute inset-0 rounded-10 border border-[#191919]/10" />
        </div>
      ))}
    </div>
  )
}
