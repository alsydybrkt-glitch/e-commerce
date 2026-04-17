import type { ReactNode } from "react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="search-results-container min-h-screen">
      {children}
    </div>
  );
}
