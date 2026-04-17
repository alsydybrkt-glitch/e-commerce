"use client";
import { useState } from "react";
import { FaBoxOpen, FaTruck, FaMapMarkerAlt, FaCheck, FaSearch, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { Interactive } from "@/shared/ui/Interactive";

const TIMELINE_STEPS = [
  { id: "placed", labelKey: "orderTracking.orderPlaced", icon: <FaBoxOpen />, date: "Oct 12, 10:23 AM", completed: true },
  { id: "processing", labelKey: "orderTracking.processing", icon: <FaCheck />, date: "Oct 13, 08:45 AM", completed: true },
  { id: "transit", labelKey: "orderTracking.shipped", icon: <FaTruck />, dateKey: "orderTracking.current", completed: true },
  { id: "out", labelKey: "orderTracking.outForDelivery", icon: <FaMapMarkerAlt />, dateKey: "orderTracking.pending", completed: false },
  { id: "delivered", labelKey: "orderTracking.delivered", icon: <FaCheck />, dateKey: "orderTracking.pending", completed: false },
];

export default function OrderTrackingPage() {
  const { t } = useTranslation();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;

    setIsSearching(true);

    // Mock API processing
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1200);
  };

  const fillSampleData = () => {
    setOrderId("94827163");
    setEmail("demo@aura-market.example.com");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
    <div className="shell mx-auto max-w-5xl py-16 xl:py-24">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
        >
          {t("orderTracking.title")}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-slate-600 dark:text-slate-400"
        >
          {t("orderTracking.description")}
        </motion.p>
      </div>

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {!hasSearched ? (
            <motion.form 
              key="tracking-form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSearch}
              className="mx-auto max-w-lg rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-10 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800"
            >
              <div className="space-y-6">
                <div className="group space-y-2">
                  <label htmlFor="orderId" className="block text-sm font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    {t("orderTracking.orderNumber")}
                  </label>
                  <input
                    id="orderId"
                    type="text"
                    placeholder={t("orderTracking.orderIdPlaceholder")}
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                    className="w-full rounded-2xl border-none bg-slate-100 px-5 py-4 text-base font-medium ring-2 ring-transparent transition-all focus:bg-white focus:ring-brand-500/20 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="group space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-brand-600 transition-colors">
                    {t("contact.yourEmail")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("orderTracking.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border-none bg-slate-100 px-5 py-4 text-base font-medium ring-2 ring-transparent transition-all focus:bg-white focus:ring-brand-500/20 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-4 mt-10">
                <Interactive>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="primary-btn flex w-full items-center justify-center gap-3 py-4 text-base font-bold shadow-lg shadow-brand-500/20"
                  >
                    {isSearching ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-white/40 border-t-white"></div>
                    ) : (
                      <>
                        <FaSearch className="text-lg" /> {t("orderTracking.trackPackage")}
                      </>
                    )}
                  </button>
                </Interactive>

                <button
                  type="button"
                  onClick={fillSampleData}
                  className="text-center text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors dark:text-slate-400 dark:hover:text-brand-400"
                >
                  {t("orderTracking.useSampleData")}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="tracking-results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mx-auto max-w-4xl rounded-[40px] bg-white p-8 shadow-2xl shadow-slate-200/40 ring-1 ring-slate-100 sm:p-12 dark:bg-slate-900 dark:shadow-none dark:ring-slate-800"
            >
              {/* Status Header */}
              <div className="flex flex-col flex-wrap gap-8 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-10 dark:border-slate-800">
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {t("orderTracking.orderNumber")} #{orderId || "94827163"}
                  </p>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {t("orderTracking.currentStatus")}: <span className="text-brand-600 dark:text-brand-400">{t("orderTracking.shipped")}</span>
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {t("orderTracking.trackingNumber")}: <span className="text-slate-800 dark:text-slate-200">FEDEX-94827-DXB</span>
                  </p>
                </div>
                <div className="rounded-[28px] bg-amber-50 px-8 py-5 ring-1 ring-amber-100 dark:bg-amber-950/20 dark:ring-amber-900/30">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600/80 dark:text-amber-500/80">
                    {t("orderTracking.estimatedDelivery")}
                  </p>
                  <p className="mt-1 text-xl font-black text-amber-900 dark:text-amber-400">
                    October 24, 2026
                  </p>
                </div>
              </div>

              {/* Responsive Hybrid Timeline */}
              <div className="mt-14 relative">
                {/* Horizontal Desktop Timeline (Above sm) */}
                <div className="hidden sm:block relative py-12">
                  <div className="absolute top-[68px] left-0 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "50%" }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-brand-600 to-brand-400"
                    />
                  </div>
                  
                  <div className="relative flex justify-between z-10">
                    {TIMELINE_STEPS.map((step, index) => (
                      <motion.div 
                        key={step.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.15 }}
                        className="flex flex-col items-center group"
                      >
                        <div 
                          className={`flex h-16 w-16 items-center justify-center rounded-3xl border-[4px] text-2xl transition-all duration-500
                            ${step.completed 
                              ? "bg-brand-600 border-white text-white shadow-lg shadow-brand-500/30 dark:border-slate-900" 
                              : "bg-white border-slate-100 text-slate-300 dark:bg-slate-800 dark:border-slate-800"
                            }
                          `}
                        >
                          {step.icon}
                        </div>
                        <div className="mt-5 text-center px-2">
                          <p className={`text-sm font-bold tracking-tight ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                            {t(step.labelKey)}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {step.date || t(step.dateKey || "")}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Vertical Mobile Timeline (Below sm) */}
                <div className="sm:hidden relative space-y-10 pl-4">
                  <div className="absolute left-10 top-2 bottom-2 w-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "50%" }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                      className="w-full bg-gradient-to-b from-brand-600 to-brand-400"
                    />
                  </div>
                  
                  {TIMELINE_STEPS.map((step, index) => (
                    <motion.div 
                      key={step.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center gap-6 relative z-10"
                    >
                      <div 
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[20px] border-[3px] text-xl transition-all duration-500
                          ${step.completed 
                            ? "bg-brand-600 border-white text-white shadow-lg shadow-brand-500/20 dark:border-slate-900" 
                            : "bg-white border-slate-100 text-slate-300 dark:bg-slate-800 dark:border-slate-800"
                          }
                        `}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1 border-b border-slate-50 pb-4 dark:border-slate-800/50">
                        <p className={`text-base font-bold ${step.completed ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                          {t(step.labelKey)}
                        </p>
                        <p className="text-sm font-medium text-slate-400">
                          {step.date || t(step.dateKey || "")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-16 flex justify-center">
                <Interactive>
                   <button
                     onClick={() => {
                       setHasSearched(false);
                       setOrderId("");
                     }}
                     className="flex items-center gap-2 rounded-2xl bg-slate-100 px-8 py-3.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                   >
                     {t("orderTracking.trackAnother")} <FaArrowRight className="text-xs" />
                   </button>
                </Interactive>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
