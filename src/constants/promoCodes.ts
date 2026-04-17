export const PROMO_CODES = {
  SAVE10: 10,
  SAVE20: 20,
};

export function getPromoDiscount(code: string) {
  return (PROMO_CODES as any)[code] ?? null;
}
