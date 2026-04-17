import type { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cart-container min-h-screen">
      {children}
    </div>
  );
}
