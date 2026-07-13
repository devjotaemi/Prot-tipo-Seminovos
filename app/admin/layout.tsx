import Link from 'next/link';
import { LayoutDashboard, CarFront, Users } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black/5 flex flex-col md:flex-row border-t border-black/10">
      <aside className="w-full md:w-64 bg-white border-r border-black/10 shrink-0">
        <div className="p-6 md:p-8 sticky top-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-8">Painel de Gestão</h2>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-black/5 transition-colors border border-transparent hover:border-black/10">
              <CarFront className="w-4 h-4" /> Veículos
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-black/5 transition-colors border border-transparent hover:border-black/10">
              <Users className="w-4 h-4" /> Leads (CRM)
            </Link>
            <Link href="/admin/insights" className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-black/5 transition-colors border border-transparent hover:border-black/10">
              <LayoutDashboard className="w-4 h-4" /> Insights
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}
