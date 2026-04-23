import { Metadata } from 'next'
import Home from "@/features/home/HomePage";
import { fetchAllProductCategories, fetchCategoryProducts } from "@/services/api/productsApi";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Home | Aura - Modern Shopping Redefined',
  description: 'Experience the ultimate premium e-commerce platform. Shop the latest in electronics, fashion, and lifestyle with Aura.',
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  // 1. Initiate fetches in parallel
  const allCategoriesPromise = fetchAllProductCategories();
  const curatedSlugs = ["smartphones", "laptops", "mobile-accessories"];
  const curatedPromises = curatedSlugs.map(slug => fetchCategoryProducts(slug, { limit: 1 }));

  // 2. Await only essential data for the first fold
  const [allCategories, ...curatedResults] = await Promise.all([
    allCategoriesPromise,
    ...curatedPromises
  ]);

  const initialProducts: Record<string, any[]> = {};
  curatedSlugs.forEach((slug, index) => {
    initialProducts[slug] = curatedResults[index];
  });

  return (
    <Suspense fallback={<div className="h-screen animate-pulse bg-slate-50 dark:bg-slate-900/10" />}>
      <Home 
        initialCategories={allCategories.slice(0, 10)} 
        initialProducts={initialProducts} 
        locale={locale} 
      />
    </Suspense>
  );
}
