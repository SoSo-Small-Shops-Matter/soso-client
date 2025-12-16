import { getDuplicateNickname } from '@/shared/api/getDuplicateNickname'
import { useQuery } from '@tanstack/react-query'

export const useGetDuplicateNicknameQuery = (nickname: string) => {
  return useQuery({
    queryKey: ['duplicateNickname', nickname],
    queryFn: () => getDuplicateNickname(nickname),
    enabled: !!nickname,
    staleTime: 0,
  })
}
