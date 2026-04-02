export function saveRecentlyViewed(product) {
  if (!product?.id) return;

  const current = getRecentlyViewed();
  const next = [product, ...current.filter((item) => item.id !== product.id)].slice(
    0,
    8
  );

  localStorage.setItem("recentlyViewedProducts", JSON.stringify(next));
}

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem("recentlyViewedProducts")) || [];
  } catch {
    return [];
  }
}

export async function shareProduct({ title, text, url }) {
  if (navigator.share) {
    await navigator.share({ title, text, url });
    return "shared";
  }

  await navigator.clipboard.writeText(url);
  return "copied";
}
