export const SHARE_BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_LOCAL_FOWARDING_URL

export const METADATA = {
  TITLE: '소품샵은 소중해',
  DESCRIPTION: '소품샵은 소중해 앱에서 확인해보세요.',
}

export const shareData = (name: string = '', shareToken: string): ShareData => ({
  title: `[${METADATA.TITLE}] ${name}`,
  text: METADATA.DESCRIPTION,
  url: `${SHARE_BASE_URL}/course/shared/${shareToken}`,
})
