import Header from '@/shared/components/layout/Header'
import Flex from '@/shared/components/layout/Flex'

export default function MyVisitedPage() {
  return (
    <div>
      <Header title="방문한 소품샵" type="back" />
      <Flex direction="col" justify="center" align="center" className="mt-90 w-full" gap={16}>
        <p className="text-center text-gray-400 font-body_m">준비 중입니다.</p>
      </Flex>
    </div>
  )
}
