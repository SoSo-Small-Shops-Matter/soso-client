import type { AddressType } from '@/shared/types/addressType';
import axios from 'axios';

export const addressSearch = async (query: string): Promise<AddressType[]> => {
  if (!query) return [];

  try {
    let response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&page=1&size=15`,
      { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}` } }
    );

    if (!response.data.documents || response.data.documents.length === 0) {
      response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&page=1&size=15`,
        { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}` } }
      );
    }

    const uniqueAddresses: AddressType[] = [];
    const seenAddresses = new Set<string>();
    for (const document of response.data.documents) {
      if (!seenAddresses.has(document.address_name)) {
        seenAddresses.add(document.address_name);
        uniqueAddresses.push(document);
      }
    }
    return uniqueAddresses;
  } catch {
    throw new Error('주소를 가져오는데 실패했습니다.');
  }
};
