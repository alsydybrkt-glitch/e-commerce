import { Metadata } from 'next'
import Home from "@/features/home/HomePage";
import { fetchAllProductCategories, fetchCategoryProducts } from "@/features/products/services/productsApi";

export const metadata: Metadata = {
  title: 'Home | Aura-Market - Modern Shopping Redefined',
  description: 'Experience the ultimate premium e-commerce platform. Shop the latest in electronics, fashion, and lifestyle with Aura-Market.',
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Only block for the categories list (highly cached)
  const allCategories = await fetchAllProductCategories();
  const categories = allCategories.slice(0, 3);
  
  // We'll only fetch the first category's products on the server to speed up initial paint
  // The rest will be loaded on the client or streamed if we had more advanced patterns
  const initialProducts: Record<string, any[]> = {};
  
  try {
    if (categories[0]) {
      initialProducts[categories[0].slug] = await fetchCategoryProducts(categories[0].slug);
    }
  } catch (error) {
    console.error("Failed to fetch initial products:", error);
  }

  return <Home initialCategories={categories} initialProducts={initialProducts} locale={locale} />;
}
