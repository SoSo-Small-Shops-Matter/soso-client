import { addressSearch } from '@/shared/api/address/api';
import { useQuery } from '@tanstack/react-query';

export const useAddressSearch = (address: string) => {
  return useQuery({
    queryKey: ['addressSearch', address],
    queryFn: () => addressSearch(address),
    enabled: !!address,
  });
};
