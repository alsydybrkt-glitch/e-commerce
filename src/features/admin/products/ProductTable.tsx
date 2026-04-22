"use client";

import { m } from "framer-motion";
import { Plus, Search, Edit2, Trash2, MoreHorizontal, Filter } from "lucide-react";
import { formatCurrency } from "@/features/cart/lib/formatCurrency";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/shared/utils/utils";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "Premium Wireless Headphones", category: "Electronics", price: 299.99, stock: 45, status: "in-stock" },
  { id: 2, name: "Ergonomic Office Chair", category: "Furniture", price: 189.50, stock: 12, status: "low-stock" },
  { id: 3, name: "Smart Fitness Watch", category: "Electronics", price: 149.00, stock: 0, status: "out-of-stock" },
  { id: 4, name: "Minimalist Desk Lamp", category: "Home Decor", price: 59.99, stock: 128, status: "in-stock" },
  { id: 5, name: "Leather Travel Backpack", category: "Accessories", price: 120.00, stock: 32, status: "in-stock" },
  { id: 6, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 159.99, stock: 8, status: "low-stock" },
];

const statusBadgeStyles = {
  "in-stock": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100",
  "low-stock": "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100",
  "out-of-stock": "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100",
};

export function ProductTable() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="surface-card p-0 overflow-hidden shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
      {/* Table Header / Action Bar */}
      <div className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between border-b dark:border-slate-800">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               placeholder={t("admin.products.filterPlaceholder")} 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-10 py-3 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-white"
            />
         </div>
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800">
               <Filter size={18} />
               {t("admin.products.filterButton")}
            </button>
            <button className="primary-btn flex items-center gap-2 px-6 py-3 font-bold shadow-lg shadow-brand-500/20">
               <Plus size={18} />
               {t("admin.products.add")}
            </button>
         </div>
      </div>

      {/* Actual Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:bg-slate-900/20">
              <th className="px-8 py-5 font-black">{t("admin.products.table.product")}</th>
              <th className="px-8 py-5 font-black text-center">{t("admin.products.table.category")}</th>
              <th className="px-8 py-5 font-black text-center">{t("admin.products.table.price")}</th>
              <th className="px-8 py-5 font-black text-center">{t("admin.products.stock")}</th>
              <th className="px-8 py-5 font-black text-center">{t("admin.products.status")}</th>
              <th className="px-8 py-5 font-black text-right rtl:text-left">{t("admin.products.table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredProducts.map((product, i) => (
              <m.tr 
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-800/20"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 dark:bg-slate-800">
                      {product.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <span className="text-xs font-semibold text-slate-500 bg-slate-100/60 px-2 py-1 rounded-lg dark:bg-slate-800/60 dark:text-slate-400">
                      {product.category}
                   </span>
                </td>
                <td className="px-8 py-6 text-center font-bold text-slate-900 dark:text-white">
                   {formatCurrency(product.price)}
                </td>
                <td className="px-8 py-6 text-center">
                   <span className={cn(
                      "text-sm font-black",
                      product.stock <= 10 ? "text-amber-600" : "text-slate-900 dark:text-white"
                   )}>
                      {product.stock}
                   </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn(
                    "inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    statusBadgeStyles[product.status as keyof typeof statusBadgeStyles]
                  )}>
                    {t(`admin.overview.statuses.${product.status.replace('-stock', '')}`)}
                  </span>
                </td>
                <td className="px-8 py-6 text-right rtl:text-left">
                   <div className="flex items-center justify-end rtl:justify-start gap-2">
                      <button 
                        title={t("admin.products.edit")}
                        aria-label={t("admin.products.edit")}
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all dark:hover:bg-brand-900/20"
                      >
                         <Edit2 size={16} />
                      </button>
                      <button 
                        title={t("admin.products.delete")}
                        aria-label={t("admin.products.delete")}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all dark:hover:bg-rose-900/20"
                      >
                         <Trash2 size={16} />
                      </button>
                      <button 
                        title={t("admin.products.details")}
                        aria-label={t("admin.products.details")}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all dark:hover:bg-slate-800"
                      >
                         <MoreHorizontal size={16} />
                      </button>
                   </div>
                </td>
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-8 border-t bg-slate-50/30 flex items-center justify-between dark:border-slate-800/60 dark:bg-slate-900/10">
         <p className="text-xs font-semibold text-slate-400">
            {t("admin.products.pagination.showing")} <span className="text-slate-900 dark:text-white">1</span> {t("admin.products.pagination.to")} <span className="text-slate-900 dark:text-white">6</span> {t("admin.products.pagination.of")} <span className="text-slate-900 dark:text-white">42</span> {t("admin.products.pagination.products")}
         </p>
         <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-400 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900" disabled>
              {t("admin.products.pagination.previous")}
            </button>
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
              {t("admin.products.pagination.next")}
            </button>
         </div>
      </div>

    </div>
  );
}
