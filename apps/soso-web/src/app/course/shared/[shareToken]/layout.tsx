import { Metadata } from 'next'

interface LayoutProps {
  params: Promise<{ shareToken: string }>
  children: React.ReactNode
}

const DEFAULT_TITLE = '소품샵은 소중해'
const DEFAULT_DESCRIPTION = '소품샵은 소중해 앱에서 확인해보세요.'

function buildMetadata(title: string, url?: string): Metadata {
  const base = { title, description: DEFAULT_DESCRIPTION }
  return {
    ...base,
    openGraph: { ...base, ...(url ? { url } : {}), type: 'website' },
  }
}

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata({ params }: { params: Promise<{ shareToken: string }> }): Promise<Metadata> {
  const { shareToken } = await params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/shared/${shareToken}`)
    const data = await res.json()
    const courseName = data?.result?.name
    const url = `${BASE_URL}/course/shared/${shareToken}`

    return buildMetadata(`[${DEFAULT_TITLE}] ${courseName}`, url)
  } catch {
    return buildMetadata(DEFAULT_TITLE)
  }
}

export default function SharedCourseLayout({ children }: LayoutProps) {
  return <>{children}</>
}
