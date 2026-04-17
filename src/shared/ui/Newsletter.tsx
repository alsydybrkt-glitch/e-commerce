"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend, FiCheckCircle } from "react-icons/fi";
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

  return (
    <section className="shell py-24">
      <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-slate-900 via-slate-800 to-black px-8 py-20 text-center lg:px-24 lg:py-28 shadow-2xl">
        {/* Animated accent blobs */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-500/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 backdrop-blur-md">
            {t("footer.kicker")}
          </span>
          <h2 className="mb-6 font-display text-4xl font-black leading-tight text-white sm:text-6xl tracking-tight">
            {t("footer.newsletterTitle")}
          </h2>
          <p className="mb-12 text-lg text-slate-400/90 leading-relaxed font-medium">
            {t("footer.newsletterCopy")}
          </p>

          {!isSubscribed ? (
            <div className="mx-auto max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row p-1.5 glass rounded-3xl group transition-all duration-300 focus-within:ring-4 focus-within:ring-brand-500/10">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 flex-1 rounded-2xl bg-transparent px-6 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="group relative h-14 min-w-[140px] px-8 rounded-2xl bg-brand-500 text-white font-bold transition-all duration-300 hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/20 overflow-hidden active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("footer.subscribe")}
                    <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-4 animate-in fade-in zoom-in duration-500">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 text-brand-400 ring-2 ring-brand-500/20">
                <FiCheckCircle className="text-4xl" />
              </div>
              <p className="text-xl font-bold text-white">
                {t("notifications.subscribeSuccess")}
              </p>
            </div>
          )}

          <p className="mt-10 text-[10px] font-medium tracking-wide text-slate-500/80 uppercase">
            By subscribing, you agree to our <span className="text-slate-300 cursor-pointer hover:text-white transition-colors">Privacy Policy</span> and <span className="text-slate-300 cursor-pointer hover:text-white transition-colors">Terms of Service</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
