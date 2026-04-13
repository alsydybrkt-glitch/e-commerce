import type { ReactNode } from "react";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="contact-container min-h-screen">
      {children}
    </div>
  );
}
