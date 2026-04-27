"use client";

import Image from "next/image";
import { memo, useCallback } from "react";
import { FiStar } from "react-icons/fi";
import { useAppDispatch } from "@/store";
import { add } from "@/features/cart/store/cartSlice";




type Props = {
  product: any;
};

function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  const rating = product.rating || 4.5;
  const reviews = product.stock || 120;

  const handleAdd = useCallback(() => {
    dispatch(add(product));
  }, [dispatch, product]);

  const oldPrice =
    product.discountPercentage > 0
      ? Math.round(
          product.price / (1 - product.discountPercentage / 100)
        )
      : null;

  return (
    <div className="border rounded-md p-3 bg-white dark:bg-gray-900 hover:shadow-sm transition flex gap-3 sm:block">
      
      {/* Image */}
      <div className="relative w-24 h-24 sm:w-full sm:h-36 flex-shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width:768px) 100px, 200px"
          className="object-contain"
          priority={false}
        />

        {/* Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-2 py-[2px] rounded">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Title */}
        <h3 className="text-sm font-medium line-clamp-2 mb-1">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs mb-1">
          <FiStar className="fill-yellow-400" />
          <span className="text-gray-700 dark:text-gray-300">
            {rating}
          </span>
          <span className="text-gray-400">
            ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <p className="text-base font-semibold">
            ${product.price}
          </p>

          {oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              ${oldPrice}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleAdd}
          className="w-full text-xs sm:text-sm bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-medium transition active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
