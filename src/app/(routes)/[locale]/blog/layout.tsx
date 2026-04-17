import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-container min-h-screen">
      {children}
    </div>
  );
}
