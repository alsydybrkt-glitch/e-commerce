import { AdminSidebar } from "@/features/admin/sidebar/AdminSidebar";
import { AdminHeader } from "@/features/admin/header/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Context Area */}
      <div className="flex flex-1 flex-col transition-all duration-300">
        <AdminHeader />
        
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

        <footer className="border-t bg-white/50 px-8 py-4 text-xs font-semibold text-slate-400 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50">
          &copy; 2026 Aura-Market. Professional Administrative Dashboard.
        </footer>
      </div>
    </div>
  );
}
