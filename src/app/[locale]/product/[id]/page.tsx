import ProductDetailsPage from "@/features/products/ProductDetailsPage";
import { Metadata } from "next";
import { fetchProductById, fetchCategoryProducts } from "@/features/products/services/productsApi";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { id: string; locale: string } }): Promise<Metadata> {
  try {
    const product = await fetchProductById(params.id);
    if (!product) return { title: "Product Not Found" };

    return {
      title: `${product.title} | E-Commerce`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images ? [{ url: product.images[0] }] : [],
      },
      alternates: {
        canonical: `/product/${params.id}`,
      },
    };
  } catch (error) {
    return { title: "Product" };
  }
}

export default async function Page({ params }: { params: { id: string; locale: string } }) {
  try {
    const product = await fetchProductById(params.id);
    
    if (!product) {
      return notFound();
    }

    // Start fetching but don't await here to allow streaming the main content
    const categoryProductsPromise = fetchCategoryProducts(product.category);

    return (
      <ProductDetailsPage 
        product={product} 
        categoryProductsPromise={categoryProductsPromise} 
        locale={params.locale}
      />
    );
  } catch (error) {
    console.error("Error loading product page:", error);
    return notFound();
  }
}

