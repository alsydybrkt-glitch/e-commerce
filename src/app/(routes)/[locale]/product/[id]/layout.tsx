import type { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="product-details-container min-h-screen">
      {children}
    </div>
  );
}
