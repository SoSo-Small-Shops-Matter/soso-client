export const PRODUCT_MAP = {
  proStiker: { id: 1, name: '스티커', value: 'pro_stiker' },
  proCloth: { id: 2, name: '의류/잡화', value: 'pro_cloth' },
  proCup: { id: 3, name: '머그컵/접시', value: 'pro_cup' },
  proLetter: { id: 4, name: '엽서', value: 'pro_letter' },
  proPhone: { id: 5, name: '휴대폰', value: 'pro_phone' },
  proHand: { id: 6, name: '핸드메이드', value: 'pro_hand' },
  proKey: { id: 7, name: '키링', value: 'pro_key' },
  proPet: { id: 8, name: '반려동물', value: 'pro_pet' },
  proAcc: { id: 9, name: '악세서리', value: 'pro_acc' },
  proDoll: { id: 10, name: '인형', value: 'pro_doll' },
  proPerfume: { id: 11, name: '향수/인센스', value: 'pro_perfume' },
  proVintage: { id: 12, name: '빈티지', value: 'pro_vintage' },
  proStationery: { id: 13, name: '문구류', value: 'pro_stationery' },
  proGacha: { id: 14, name: '가챠', value: 'pro_gacha' },
  proInterior: { id: 15, name: '인테리어', value: 'pro_interior' },
  proEtc: { id: 16, name: '기타', value: 'pro_etc' },
} as const;

export type ProductValue = keyof typeof PRODUCT_MAP;

export const PRODUCT_LIST = Object.values(PRODUCT_MAP);

export const PRODUCT_BY_ID: Record<number, (typeof PRODUCT_LIST)[number]> = PRODUCT_LIST.reduce(
  (acc, product) => ({ ...acc, [product.id]: product }),
  {}
);
