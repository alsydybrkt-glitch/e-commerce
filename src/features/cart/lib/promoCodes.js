export const PROMO_CODES = {
  SAVE10: 10,
  SAVE20: 20,
};

export function getPromoDiscount(code) {
  return PROMO_CODES[code] ?? null;
}
