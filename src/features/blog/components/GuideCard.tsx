"use client";
import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { m } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Interactive } from "@/shared/ui/Interactive";

interface GuideCardProps {
  guide: {
    image: string;
    title: string;
    description: string;
    eyebrow: string;
    readTime: string;
    categorySlug: string;
    searchTerms: string[];
  };
  categoryName: string;
}

export default function GuideCard({ guide, categoryName }: GuideCardProps) {
  const { t } = useTranslation();
  
  return (
    <Interactive variant="scale" className="h-full">
      <m.article 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white transition-all duration-500 hover:border-brand-500/30 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/40"
      >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
            <FiClock className="text-xs text-brand-600" />
            {guide.readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
          {guide.eyebrow}
        </div>

        <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
          {guide.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {guide.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {guide.searchTerms.slice(0, 3).map((term: string) => (
            <span
              key={term}
              className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-brand-900/20 dark:group-hover:text-brand-400"
            >
              {term}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <Link
            href={`/category/${guide.categorySlug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
          >
            {t("blog.readThroughProducts")}
            <FiArrowUpRight className="text-lg" aria-hidden="true" />
          </Link>
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {categoryName}
          </span>
        </div>
      </div>
    </m.article>
    </Interactive>
  );
}

