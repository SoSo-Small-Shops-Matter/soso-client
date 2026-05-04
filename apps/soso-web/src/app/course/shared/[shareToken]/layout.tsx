import { Metadata } from 'next'
import { METADATA, SHARE_BASE_URL } from './constants'

interface LayoutProps {
  params: Promise<{ shareToken: string }>
  children: React.ReactNode
}

const FALLBACK_OG_IMAGE = `${SHARE_BASE_URL}/images/confirm.png`

function buildMetadata(title: string, ogImage: string, url?: string): Metadata {
  const base = { title, description: METADATA.DESCRIPTION }
  return {
    ...base,
    openGraph: { ...base, ...(url ? { url } : {}), type: 'website', images: [ogImage] },
  }
}

export async function generateMetadata({ params }: { params: Promise<{ shareToken: string }> }): Promise<Metadata> {
  const { shareToken } = await params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/shared/${shareToken}`)
    const data = await res.json()
    const courseName = data?.result?.name
    const url = `${SHARE_BASE_URL}/course/shared/${shareToken}`
    const ogImage = `${SHARE_BASE_URL}/course/shared/${shareToken}/api`

    return buildMetadata(`[${METADATA.TITLE}] ${courseName}`, ogImage, url)
  } catch {
    return buildMetadata(METADATA.TITLE, FALLBACK_OG_IMAGE)
  }
}

export default function SharedCourseLayout({ children }: LayoutProps) {
  return <>{children}</>
}
