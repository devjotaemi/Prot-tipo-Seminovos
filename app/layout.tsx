import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Link from 'next/link';
import { Menu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seu Nome Aqui!',
  description: 'Revenda de veículos seminovos de qualidade.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white" suppressHydrationWarning>
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-sm group-hover:scale-105 transition-transform">
                <span className="font-bold text-xl tracking-tighter">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight uppercase leading-none">Seu Nome</span>
                <span className="text-[10px] tracking-widest text-black/50 uppercase">Aqui!</span>
              </div>
            </Link>
            <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
              <Link href="/estoque" className="hover:text-black/50 transition-colors">Estoque</Link>
              <Link href="/#quem-somos" className="hover:text-black/50 transition-colors">Sobre</Link>
              <Link href="/admin" className="hover:text-black/50 transition-colors">Painel Lojista</Link>
            </nav>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-black text-white py-20 mt-20">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-sm">
                  <span className="font-bold text-xl tracking-tighter">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight uppercase leading-none">Seu Nome</span>
                  <span className="text-[10px] tracking-widest text-white/50 uppercase">Aqui!</span>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Tradição e confiança em seminovos desde 2013 em Taquaritinga. O carro que você procura está aqui.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Endereço</h4>
              <address className="text-white/60 text-sm not-italic flex flex-col gap-2">
                <span>Av. Adamo Lui, 1590</span>
                <span>Jardim Buscardi</span>
                <span>Taquaritinga / SP</span>
              </address>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Contato</h4>
              <div className="flex flex-col gap-2 text-white/60 text-sm">
                <a href="https://wa.me/5516999999999" className="hover:text-white transition-colors">WhatsApp: (16) 99999-9999</a>
                <a href="https://instagram.com/eliteveiculos.taq" className="hover:text-white transition-colors">Instagram: @eliteveiculos.taq</a>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} Seu Nome Aqui!.</span>
            <span>Protótipo Minimalista Preto e Branco</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
