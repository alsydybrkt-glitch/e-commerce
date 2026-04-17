"use client";
import Image from "next/image";
import { LocalizedLink as Link } from "@/shared/ui/LocalizedLink";
import { FiArrowRight, FiArrowUpRight, FiClock, FiLayers } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface BlogHeroProps {
  featuredGuide: {
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogHero({ featuredGuide, categoryName }: BlogHeroProps) {
  const { t } = useTranslation();
  
  return (
    <section className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">

      {/* Background Decorative Glow */}
      <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />
      
      <motion.article 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="group relative overflow-hidden rounded-[40px] bg-slate-950 shadow-2xl transition-all duration-500"
      >
        <div className="relative h-[400px] w-full overflow-hidden sm:h-[480px]">
          <Image
            src={featuredGuide.image}
            alt={featuredGuide.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
            priority
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative -mt-32 p-8 sm:p-12 lg:-mt-40">
          <motion.div variants={fadeInUp} className="mb-6 flex flex-wrap items-center gap-4">
             <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              <FiLayers className="text-xs" />
              {categoryName}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <FiClock className="text-xs" />
              {featuredGuide.readTime}
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:max-w-4xl"
          >
            {featuredGuide.title}
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300/90"
          >
            {featuredGuide.description}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/category/${featuredGuide.categorySlug}`}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-bold text-slate-950 transition-all hover:bg-slate-100 hover:ring-4 hover:ring-white/20"
            >
              {t("common.exploreCategory")}
              <FiArrowUpRight className="text-lg" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              {t("common.visitShop")}
            </Link>
          </motion.div>
        </div>
      </motion.article>

      <motion.aside 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative flex flex-col justify-between overflow-hidden rounded-[40px] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/50 dark:backdrop-blur-xl sm:p-10"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px]" />
        
        <div className="relative">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">
            {t("blog.topicsKicker")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("blog.topicsTitle")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            {t("blog.topicsCopy")}
          </p>
        </div>

        <div className="relative mt-12 space-y-4">
          {featuredGuide.searchTerms.map((term: string, idx: number) => (
            <motion.div
              key={term}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="group flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-5 transition-all hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800"
            >
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {term}
              </span>
              <FiArrowRight
                className="text-slate-400 transition-transform group-hover:translate-x-1 dark:text-slate-500"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </motion.aside>
    </section>
  );
}

