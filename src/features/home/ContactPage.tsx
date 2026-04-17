"use client";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "@/shared/hooks/useTranslation";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const info = useMemo(
    () => [
      { icon: FaEnvelope, title: t("contact.email"), value: "support@shop.com" },
      { icon: FaPhoneAlt, title: t("contact.phone"), value: "+20 123 456 789" },
      { icon: FaMapMarkerAlt, title: t("contact.location"), value: "Cairo, Egypt" },
    ],
    [t]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(t("notifications.fillRequired"));
      return;
    }

    toast.success(t("notifications.messageSent"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-page shell section-gap">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card p-8">
          <span className="section-kicker">{t("contact.kicker")}</span>
          <h1 className="section-title">{t("contact.title")}</h1>
          <p className="mt-4 section-copy">{t("contact.copy")}</p>

          <div className="mt-8 space-y-4">
            {info.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-[24px] bg-slate-50 p-4 dark:bg-slate-800/50 dark:ring-1 dark:ring-slate-700/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-card dark:bg-slate-800 dark:text-brand-400">
                  {React.createElement(item.icon)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="surface-card p-8" onSubmit={handleSubmit}>
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
            {t("contact.sendMessage")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder={t("contact.yourName")}
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <input
              type="email"
              placeholder={t("contact.yourEmail")}
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <textarea
              placeholder={t("contact.yourMessage")}
              value={form.message}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, message: event.target.value }))
              }
              className="min-h-48 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 sm:col-span-2"
            />
          </div>
          <button type="submit" className="primary-btn mt-6">
            {t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  );
}
