import { Product } from "@/features/products/services/productsApi";

export function saveRecentlyViewed(product: Partial<Product>) {
  if (!product?.id) return;

  const current = getRecentlyViewed();
  const next = [product, ...current.filter((item: any) => item.id !== product.id)].slice(
    0,
    8
  );

  localStorage.setItem("recentlyViewedProducts", JSON.stringify(next));
}

export function getRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("recentlyViewedProducts");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export async function shareProduct({ title, text, url }: { title: string; text: string; url: string }) {
  if (navigator.share) {
    await navigator.share({ title, text, url });
    return "shared";
  }

  await navigator.clipboard.writeText(url);
  return "copied";
}
