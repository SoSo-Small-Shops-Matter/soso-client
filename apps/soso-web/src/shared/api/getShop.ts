import { DEFAULT_LOCATION } from '@/shared/constant/location';
import { ShopType } from '@/shared/types/shopType';
import { customFetch } from '@/shared/utils/customFetch';

export const getShop = async (
  lat?: number | null,
  lng?: number | null,
  sorting: boolean = false,
  isWishlist: boolean = true,
  productIds: number[] = []
): Promise<ShopType[]> => {
  const result = await customFetch(
    `/shop?lat=${lat || DEFAULT_LOCATION.lat}&lng=${lng || DEFAULT_LOCATION.lng}&sorting=${sorting}&isWishlist=${isWishlist}${productIds.length > 0 ? `&productIds=${productIds}` : ''}`
  );

  return result.result;
};
