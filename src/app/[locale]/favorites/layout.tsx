import type { ReactNode } from "react";

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="favorites-container min-h-screen">
      {children}
    </div>
  );
}
