import { Metadata } from 'next'
import Home from "@/features/home/HomePage";
import { fetchAllProductCategories, fetchCategoryProducts } from "@/services/api/productsApi";

export const metadata: Metadata = {
  title: 'Home | Aura - Modern Shopping Redefined',
  description: 'Experience the ultimate premium e-commerce platform. Shop the latest in electronics, fashion, and lifestyle with Aura.',
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // Fetch all categories (highly cached)
  const allCategories = await fetchAllProductCategories();
  
  // We want to fetch products for the main curated categories specifically
  const curatedSlugs = ["smartphones", "laptops", "mobile-accessories"];
  const initialProducts: Record<string, any[]> = {};
  
  try {
    // Fetch products for curated categories in parallel
    const results = await Promise.all(
      curatedSlugs.map(slug => fetchCategoryProducts(slug, { limit: 1 }))
    );
    
    curatedSlugs.forEach((slug, index) => {
      initialProducts[slug] = results[index];
    });

    // Also fetch the first few categories from ALL categories for the sliders if needed
    const sliderCategories = allCategories.slice(0, 5);
    const sliderResults = await Promise.all(
      sliderCategories.map(cat => fetchCategoryProducts(cat.slug, { limit: 12 }))
    );

    sliderCategories.forEach((cat, index) => {
      if (!initialProducts[cat.slug]) {
        initialProducts[cat.slug] = sliderResults[index];
      }
    });

  } catch (error) {
    console.error("Failed to fetch initial page products:", error);
  }

  return (
    <Home 
      initialCategories={allCategories.slice(0, 10)} 
      initialProducts={initialProducts} 
      locale={locale} 
    />
  );
}
