import type { ReactNode } from "react";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="category-results-container min-h-screen">
      {children}
    </div>
  );
}
