import React from 'react';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { LocalizedLink as Link } from '@/shared/ui/LocalizedLink';
import { getTranslations } from '@/config/i18n/get-translations';
import { SiApple, SiSamsung, SiSony, SiDell, SiAsus, SiLenovo, SiHp, SiXiaomi } from "react-icons/si";

interface TopBrandsSectionProps {
  locale: string;
}

const BRANDS = [
  { id: 'apple', name: 'Apple', slug: 'apple', Icon: SiApple, color: 'group-hover:text-black dark:group-hover:text-white', bg: 'bg-zinc-100 dark:bg-zinc-800/40' },
  { id: 'samsung', name: 'Samsung', slug: 'samsung', Icon: SiSamsung, color: 'group-hover:text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { id: 'sony', name: 'Sony', slug: 'sony', Icon: SiSony, color: 'group-hover:text-black dark:group-hover:text-white', bg: 'bg-slate-100 dark:bg-slate-800/30' },
  { id: 'dell', name: 'Dell', slug: 'dell', Icon: SiDell, color: 'group-hover:text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { id: 'asus', name: 'ASUS', slug: 'asus', Icon: SiAsus, color: 'group-hover:text-blue-700', bg: 'bg-slate-50 dark:bg-slate-900/20' },
  { id: 'lenovo', name: 'Lenovo', slug: 'lenovo', Icon: SiLenovo, color: 'group-hover:text-red-600', bg: 'bg-red-50 dark:bg-red-900/10' },
  { id: 'hp', name: 'HP', slug: 'hp', Icon: SiHp, color: 'group-hover:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/10' },
  { id: 'xiaomi', name: 'Xiaomi', slug: 'xiaomi', Icon: SiXiaomi, color: 'group-hover:text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10' },
];

export default function TopBrandsSection({ locale }: TopBrandsSectionProps) {
  const { t } = getTranslations(locale as any);

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8 lg:py-16">
      <SectionHeader 
        kicker={t('home.brandsTitle')} 
        title={t('home.brandsCopy')} 
      />
      
      {/* 
        Responsive layout: 
        - 2 columns on mobile for visibility
        - 4 columns on tablets
        - 8 columns on desktop to form a sleek single row of brands
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-5">
        {BRANDS.map(({ id, name, slug, Icon, color, bg }) => (
          <Link
            key={id}
            href={`/shop?brand=${slug}`}
            className={`group relative flex flex-col h-24 lg:h-32 items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${bg} hover:border-transparent`}
          >
            {/* SVG Icon provides best performance (zero network requests) and infinite scaling */}
            <div className={`text-4xl lg:text-5xl text-slate-400 dark:text-slate-500 transition-colors duration-300 ${color} mb-1 lg:mb-2`}>
               <Icon />
            </div>
            
            {/* Brand name fades in subtly */}
            <span className="text-xs lg:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
              {name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
