"use client";
import React from "react";
import { FiTruck, FiShield, FiHeadphones, FiCreditCard } from "react-icons/fi";
import { useTranslation } from "@/shared/hooks/useTranslation";

export function TrustBar() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <FiTruck className="text-2xl text-brand-600 dark:text-brand-400" />,
      title: "Global Shipping",
      description: "Fast and secure delivery to your doorstep.",
    },
    {
      icon: <FiShield className="text-2xl text-brand-600 dark:text-brand-400" />,
      title: "Secure Payment",
      description: "Certified payment processing for total peace of mind.",
    },
    {
      icon: <FiHeadphones className="text-2xl text-brand-600 dark:text-brand-400" />,
      title: "24/7 Support",
      description: "Expert assistance whenever you need it.",
    },
    {
      icon: <FiCreditCard className="text-2xl text-brand-600 dark:text-brand-400" />,
      title: "Official Warranty",
      description: "Full protection for all your tech investments.",
    },
  ];

  return (
    <section className="shell py-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20">
              {benefit.icon}
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold text-text-primary dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary dark:text-slate-400">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 h-px w-full bg-border-light dark:bg-slate-800" />
    </section>
  );
}
