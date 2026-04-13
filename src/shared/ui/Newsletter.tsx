"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "@/shared/i18n/useTranslation";

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
      <div className="relative overflow-hidden rounded-[40px] bg-bg-secondary px-8 py-16 text-center dark:bg-slate-900/50 lg:px-24 lg:py-24">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-100 opacity-20 blur-3xl dark:bg-brand-900/10" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl dark:bg-blue-900/10" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
            {t("footer.kicker")}
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-text-primary dark:text-white sm:text-5xl">
            {t("footer.newsletterTitle")}
          </h2>
          <p className="mb-12 text-lg text-text-secondary dark:text-slate-400">
            {t("footer.newsletterCopy")}
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 flex-1 rounded-2xl border border-border-light bg-surface-primary px-6 text-sm text-text-primary placeholder:text-text-muted dark:border-slate-800 dark:bg-slate-900"
                required
              />
              <button
                type="submit"
                className="group btn btn-primary h-14 min-w-[160px] gap-2 rounded-2xl"
              >
                {t("footer.subscribe")}
                <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-lg font-bold text-brand-600 dark:text-brand-400">
              <FiCheckCircle className="text-2xl" />
              {t("notifications.subscribeSuccess")}
            </div>
          )}

          <p className="mt-8 text-[11px] text-text-muted">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </div>
    </section>
  );
}
