import { useState, useMemo, useEffect } from "react";
import { Product as ProductType } from "@/services/api/productsApi";

/**
 * Hook to handle pagination logic for products in a grid/slider.
 */
export function useProductPagination(
  products: ProductType[],
  itemsPerPage: number = 4,
  isMobile: boolean = false
) {
  const items = useMemo(() => (Array.isArray(products) ? products : []), [products]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    if (isMobile) return items;
    return items.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [items, currentPage, isMobile, itemsPerPage]);

  const canLoop = items.length > itemsPerPage;

  // Reset page when products change
  useEffect(() => {
    setCurrentPage(0);
  }, [items.length]);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));

  return {
    currentPage,
    totalPages,
    paginatedItems,
    items,
    canLoop,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
  };
}
