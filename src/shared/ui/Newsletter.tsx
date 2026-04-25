"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { 
  FiSend, 
  FiCheckCircle, 
  FiShield, 
  FiGift, 
  FiBell 
} from "react-icons/fi";
import { m, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error(t("notifications.invalidEmail"));
      return;
    }

    setIsSubscribed(true);
    toast.success(t("notifications.subscribeSuccess"));
    setEmail("");
  };

  const benefits = [
    { icon: <FiGift className="text-emerald-400" />, text: t("footer.benefitDeals") || "Exclusive Deals" },
    { icon: <FiBell className="text-blue-400" />, text: t("footer.benefitUpdates") || "New Arrivals" },
    { icon: <FiShield className="text-purple-400" />, text: t("footer.benefitPrivacy") || "Privacy First" }
  ];

  return (
    <section className="shell relative py-10 lg:py-16">
      <m.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[1rem] lg:rounded-[1.5rem] bg-white dark:bg-slate-950 px-6 py-10 text-center lg:px-20 lg:py-14 shadow-xl border border-slate-100 dark:border-white/5"
      >
        {/* Modern Background with Image & Layers */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/assets/newsletter-bg.png" 
            alt="Newsletter Background" 
            fill
            priority
            className="object-cover opacity-[0.05] dark:opacity-30 mix-blend-multiply dark:mix-blend-soft-light"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-slate-50/90 dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-900/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.04),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
        </div>

        {/* Subtle accent blobs */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-500/[0.03] dark:bg-brand-500/5 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/[0.03] dark:bg-blue-500/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="mb-4 inline-flex rounded-full border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400/80 backdrop-blur-md">
              {t("footer.kicker")}
            </span>
          </m.div>

          <h2 className="mb-4 font-display text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl tracking-tight">
            <span className="bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
              {t("footer.newsletterTitle")}
            </span>
          </h2>
          
          <p className="mx-auto mb-8 max-w-lg text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed lg:text-base">
            {t("footer.newsletterCopy")}
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <m.div 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-lg"
              >
                <form 
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-3 sm:flex-row p-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl group transition-all duration-500 focus-within:ring-2 focus-within:ring-brand-500/10 dark:focus-within:ring-brand-500/20"
                >
                  <input
                    type="email"
                    placeholder={t("footer.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 flex-1 rounded-lg bg-transparent px-5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="group relative h-11 min-w-[130px] px-6 rounded-lg bg-emerald-600 text-white font-bold transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-xs">
                      {t("footer.subscribe")}
                      <FiSend className="text-[10px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </button>
                </form>

                {/* Benefits Grid */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                  {benefits.map((benefit, i) => (
                    <m.div 
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500/80"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                        {benefit.icon}
                      </span>
                      {benefit.text}
                    </m.div>
                  ))}
                </div>
              </m.div>
            ) : (
              <m.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-5 py-4"
              >
                <div className="relative">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                    <FiCheckCircle className="text-3xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                    {t("notifications.awesomeTitle") || "You're In!"}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t("notifications.subscribeSuccess")}
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubscribed(false)}
                  className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500/80 hover:text-emerald-500 transition-colors underline underline-offset-4"
                >
                  {t("common.back") || "Go Back"}
                </button>
              </m.div>
            )}
          </AnimatePresence>

          <p className="mt-10 text-[8px] font-semibold tracking-wider text-slate-400 dark:text-slate-600 uppercase">
            By joining, you agree to our <span className="text-slate-500 dark:text-slate-500 cursor-pointer hover:text-emerald-500 transition-colors">Privacy Policy</span> and <span className="text-slate-500 dark:text-slate-500 cursor-pointer hover:text-emerald-400 transition-colors">Terms</span>.
          </p>
        </div>
      </m.div>
    </section>
  );
}
