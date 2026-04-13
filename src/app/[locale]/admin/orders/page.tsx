import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Management | Admin",
  description: "Track and manage customer orders and shipments.",
};

export default function OrdersAdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Orders
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Track customer purchases, manage fulfillment, and update shipment statuses.
        </p>
      </div>

      <div className="surface-card p-12 text-center shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-400 dark:bg-slate-800">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
         </div>
         <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Orders module under construction</h3>
         <p className="mt-2 text-sm text-slate-500">The advanced order management view is coming soon.</p>
      </div>
    </div>
  );
}
