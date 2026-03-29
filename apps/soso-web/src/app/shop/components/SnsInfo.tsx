import InstaIcon from '@/app/shop/components/SnsInfo/components/InstaIcon'
import ContentBox from '@/shared/components/layout/ContentBox'
import Flex from '@/shared/components/layout/Flex'
import ContentTitle from '@/shared/components/text/ContentTitle'
import EmptyData from '@/shared/components/ui/EmptyData'

interface SnsInfoProps {
  instaId: string
}
export default function SnsInfo({ instaId }: SnsInfoProps) {
  const openInstagram = (instagramId: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      window.location.href = `instagram://user?username=${instagramId}`

      setTimeout(() => {
        window.open(`https://www.instagram.com/${instagramId}/`, '_blank')
      }, 1000)
    } else {
      window.open(`https://www.instagram.com/${instagramId}/`, '_blank')
    }
  }

  return (
    <ContentBox>
      <Flex direction="col" gap={18} className="w-full">
        <Flex justify="between" align="center" className="w-full">
          <ContentTitle title="SNS" />
        </Flex>
        {instaId ? (
          <button onClick={() => openInstagram(instaId)} className="flex items-center gap-8">
            <InstaIcon />
            <p className="text-14 font-medium text-gray-800 underline">{instaId}</p>
          </button>
        ) : (
          <EmptyData text="등록된 SNS가 없습니다." />
        )}
      </Flex>
    </ContentBox>
  )
}
