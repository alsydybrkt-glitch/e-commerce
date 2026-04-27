"use client";

import React, { useState, useEffect } from 'react';
import { Product as ProductType } from "@/services/api/productsApi";
import { getTranslations } from "@/config/i18n/get-translations";
import ProductCard from "@/features/products/slide-product/Product";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FiArrowRight } from "react-icons/fi";

interface FlashSaleSectionProps {
  products: ProductType[];
  locale: string;
}

export default function FlashSaleSection({ products, locale }: FlashSaleSectionProps) {
  const { t } = getTranslations(locale as any);
  
  // Simple countdown timer logic (mocking a sale that ends in 4 hours, 20 mins, etc)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 23, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  if (!products || products.length === 0) return null;

  // Let's show only first 4 products for desktop
  const flashSaleProducts = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-12 lg:py-20">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between bg-brand-50 dark:bg-brand-900/10 p-6 sm:p-8 rounded-2xl border border-brand-100 dark:border-brand-900/30">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-bold uppercase tracking-wider text-xs rounded-full mb-3">
              {t('home.flashSaleTitle')}
            </span>
            <h2 className="text-3xl font-bold text-text-primary dark:text-white sm:text-4xl">
              {t('home.flashSaleTitle')}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4">
            <span className="text-sm font-semibold text-text-secondary">{t('home.flashSaleEndsIn')}</span>
            <div className="flex gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 font-bold shadow-sm">{formatTime(timeLeft.hours)}</span>
              <span className="text-red-500 font-bold text-xl self-center">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 font-bold shadow-sm">{formatTime(timeLeft.minutes)}</span>
              <span className="text-red-500 font-bold text-xl self-center">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 font-bold shadow-sm">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        <Link 
          href="/shop?sale=flash" 
          className="group btn btn-primary w-fit h-12 px-6 gap-2 bg-red-500 hover:bg-red-600 border-none text-white shadow-md hover:shadow-lg transition-all"
        >
          {t('home.shopNow')}
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {flashSaleProducts.map((product) => (
           // Wrapping product card to add a discount badge
          <div key={product.id} className="relative">
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-md shadow-sm">
              -30%
            </div>
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
