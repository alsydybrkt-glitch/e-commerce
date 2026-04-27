import React, { memo } from "react";
import Image from "next/image";
import { Product as ProductType } from "@/services/api/productsApi";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";

interface ProductCardImageProps {
  item: ProductType;
  image: string;
  priority?: boolean;
}

const ProductCardImage = ({
  item,
  image,
  priority = false,
}: ProductCardImageProps) => {
  return (
    <Link href={`/product/${item.id}`} className="block flex-1 group/image">
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-md bg-surface-image shadow-inner">
        <Image
          src={image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 30vw, 300px"
          priority={priority}
          className="object-contain p-4 transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-2"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent dark:from-black/10" />
      </div>
    </Link>
  );
};

export default memo(ProductCardImage);
