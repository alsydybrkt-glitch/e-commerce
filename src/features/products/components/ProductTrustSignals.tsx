"use client";
import { 
  FaShippingFast, 
  FaShieldAlt, 
  FaUndoAlt, 
  FaMedal 
} from "react-icons/fa";
import { useTranslation } from "@/shared/i18n/useTranslation";

export function ProductTrustSignals() {
  const { t } = useTranslation();

  const signals = [
    { 
      icon: <FaShippingFast className="text-xl text-brand-600" />, 
      label: "Free Shipping", 
      desc: "On orders over $50" 
    },
    { 
      icon: <FaShieldAlt className="text-xl text-brand-600" />, 
      label: "Secure Payment", 
      desc: "SSL encrypted checkout" 
    },
    { 
      icon: <FaUndoAlt className="text-xl text-brand-600" />, 
      label: "Easy Returns", 
      desc: "30-day hassle-free policy" 
    },
    { 
      icon: <FaMedal className="text-xl text-brand-600" />, 
      label: "Premium Quality", 
      desc: "100% authentic product" 
    }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8 dark:border-slate-800">
      {signals.map((signal, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/40">
            {signal.icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{signal.label}</h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{signal.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
