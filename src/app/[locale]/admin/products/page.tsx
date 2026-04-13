import { ProductTable } from "@/features/admin/products/ProductTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Management | Admin",
  description: "Manage your store inventory, prices, and stock levels.",
};

export default function ProductsAdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Inventory
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Manage your store products, monitor stock alerts, and update catalog details.
        </p>
      </div>

      <ProductTable />
    </div>
  );
}
