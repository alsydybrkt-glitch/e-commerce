import type { ReactNode } from "react";

export default function OrderTrackingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="order-tracking-container min-h-screen">
      {children}
    </div>
  );
}
