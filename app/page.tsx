"use client";

import { useState } from 'react';
import { formatCurrency } from '@/lib/data';
import { useAppStore } from '@/store';
import Link from 'next/link';
import { ArrowRight, Search, Car, Bike, MapPin, Gauge, Calendar, ChevronRight, Key, Users, PiggyBank } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const vehicles = useAppStore(state => state.vehicles);
  const featuredVehicles = vehicles.filter(v => v.featured);
  const [searchTab, setSearchTab] = useState<'carros' | 'motos'>('carros');

  return (
    <div className="w-full bg-[#F5F5F5]">
      {/* HERO & SEARCH WIDGET (Webmotors Style) */}
      <section className="relative w-full pt-16 pb-40 bg-black flex flex-col items-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="https://picsum.photos/seed/car_showroom/1920/1080"
            alt="Showroom"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center mt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center uppercase tracking-tighter drop-shadow-lg">
            O seminovo ideal para você
          </h1>

          {/* SEARCH BOX */}
          <div className="w-full max-w-4xl bg-white rounded-md shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-black/10">
              <button 
                onClick={() => setSearchTab('carros')}
                className={`flex-1 py-5 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-colors ${searchTab === 'carros' ? 'text-black border-b-2 border-black bg-black/5' : 'text-black/50 hover:text-black/80 hover:bg-black/5'}`}
              >
                <Car className="w-5 h-5" /> Comprar Carros
              </button>
              <button 
                onClick={() => setSearchTab('motos')}
                className={`flex-1 py-5 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-colors ${searchTab === 'motos' ? 'text-black border-b-2 border-black bg-black/5' : 'text-black/50 hover:text-black/80 hover:bg-black/5'}`}
              >
                <Bike className="w-5 h-5" /> Comprar Motos
              </button>
            </div>

            {/* Search Inputs */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                  <input 
                    type="text" 
                    placeholder="Digite marca ou modelo" 
                    className="w-full border border-black/20 rounded-sm pl-12 pr-4 py-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="w-full md:w-48 relative">
                  <select className="w-full border border-black/20 rounded-sm px-4 py-4 text-sm font-bold uppercase tracking-wider text-black/70 focus:outline-none focus:border-black appearance-none bg-white cursor-pointer">
                    <option value="">Ano a partir de</option>
                    <option value="2010">2010</option>
                    <option value="2015">2015</option>
                    <option value="2020">2020</option>
                  </select>
                  <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-black/40 rotate-90 pointer-events-none" />
                </div>
                <Link href="/estoque" className="bg-black text-white rounded-sm px-10 py-4 font-bold text-sm uppercase tracking-widest flex items-center justify-center hover:bg-black/80 transition-colors">
                  Ver Ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS: MARCAS E CATEGORIAS */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Marcas */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-black/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm">Busque por Marca</h3>
              <Link href="/estoque" className="text-xs font-bold text-black/40 uppercase tracking-widest flex items-center hover:text-black transition-colors">
                Ver todas <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2 text-center">
              {['Chevrolet', 'Fiat', 'Honda', 'Toyota', 'VW'].map(marca => (
                <Link href={`/estoque`} key={marca} className="flex flex-col items-center gap-3 group">
                  <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black group-hover:bg-black transition-colors bg-white shadow-sm">
                    <span className="font-bold text-sm uppercase text-black/60 group-hover:text-white">{marca[0]}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-black">{marca}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categorias & Preço */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-black/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold uppercase tracking-widest text-sm">Categorias & Faixas</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Hatches', 'Sedans', 'Picapes', 'SUVs', 'Até R$ 20 mil', 'R$ 20 a 40 mil', 'Acima de 40 mil'].map(tag => (
                <Link href="/estoque" key={tag} className="border border-black/10 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-black/60 hover:border-black hover:text-black hover:bg-black/5 transition-colors bg-white rounded-full">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE CARDS */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8">Encontre o veículo certo para você</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/estoque" className="bg-white border border-black/10 rounded-md p-6 hover:shadow-xl hover:border-black transition-all flex flex-col group">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
              <Key className="w-6 h-6 text-black/60 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Primeiro carro</h3>
            <p className="text-black/60 text-xs leading-relaxed">A escolha perfeita para iniciar sua jornada no volante.</p>
          </Link>
          <Link href="/estoque" className="bg-white border border-black/10 rounded-md p-6 hover:shadow-xl hover:border-black transition-all flex flex-col group">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
              <Users className="w-6 h-6 text-black/60 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Carros para família</h3>
            <p className="text-black/60 text-xs leading-relaxed">Espaço e conforto para viagens com quem você ama.</p>
          </Link>
          <Link href="/estoque" className="bg-white border border-black/10 rounded-md p-6 hover:shadow-xl hover:border-black transition-all flex flex-col group">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
              <MapPin className="w-6 h-6 text-black/60 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Carros para Uber e 99</h3>
            <p className="text-black/60 text-xs leading-relaxed">Economia e confiança para rodar todos os dias.</p>
          </Link>
          <Link href="/estoque" className="bg-white border border-black/10 rounded-md p-6 hover:shadow-xl hover:border-black transition-all flex flex-col group">
            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
              <PiggyBank className="w-6 h-6 text-black/60 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Carros econômicos</h3>
            <p className="text-black/60 text-xs leading-relaxed">Consumo baixo e praticidade para a sua rotina.</p>
          </Link>
        </div>
      </section>

      {/* FEATURED INVENTORY */}
      <section className="py-12 container mx-auto px-4 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase">Ofertas em Destaque</h2>
          </div>
          <Link href="/estoque" className="hidden md:flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-black/50 hover:text-black transition-colors">
            Ver Estoque Completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map(vehicle => (
            <Link href={`/estoque/${vehicle.id}`} key={vehicle.id} className="bg-white group block border border-black/10 hover:border-black hover:shadow-xl transition-all rounded-md overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] bg-black/5 overflow-hidden">
                <Image
                  src={vehicle.images[0]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-bold tracking-tight uppercase mb-1 line-clamp-1">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-black/50 text-[10px] mb-4 uppercase tracking-wider line-clamp-1">{vehicle.version}</p>
                
                <div className="mt-auto">
                  <span className="font-bold text-2xl tracking-tighter block mb-4">{formatCurrency(vehicle.price)}</span>
                  
                  <div className="flex justify-between items-center text-[10px] text-black/50 uppercase tracking-widest border-t border-black/10 pt-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {vehicle.year}</span>
                    <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {vehicle.mileage.toLocaleString('pt-BR')} km</span>
                  </div>
                  <div className="text-[10px] text-black/40 uppercase tracking-widest mt-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Taquaritinga, SP
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/estoque" className="inline-flex bg-black rounded-sm text-white px-8 py-4 uppercase font-bold tracking-widest text-xs">
            Ver Estoque Completo
          </Link>
        </div>
      </section>

      {/* NEWS PORTAL */}
      <section className="py-12 container mx-auto px-4 mb-10">
        <div className="flex justify-between items-end mb-8 border-b border-black/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase">Últimas notícias</h2>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-black/50 hover:text-black transition-colors">
            Conferir notícias <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-6 snap-x scrollbar-hide">
          {[
            {
              category: "Últimas notícias",
              title: "Chevrolet Sonic RS mostra agilidade e bom consumo",
              author: "Fernando Calmon",
              image: "https://picsum.photos/seed/sonic/400/300"
            },
            {
              category: "Últimas notícias",
              title: "Produção do Jeep Avenger será ampliada",
              author: "Fernando Calmon",
              image: "https://picsum.photos/seed/jeep/400/300"
            },
            {
              category: "Últimas notícias",
              title: "Mercado revisa para cima as projeções de vendas",
              author: "Fernando Calmon",
              image: "https://picsum.photos/seed/market/400/300"
            },
            {
              category: "Últimas notícias",
              title: "BYD Dolphin Mini cresce para enfrentar EX2 e cia",
              author: "Evandro Enoshita",
              image: "https://picsum.photos/seed/dolphin/400/300"
            },
            {
              category: "Seu bolso",
              title: "BYD Dolphin ou GWM Ora 03: qual carro comprar?",
              author: "Evandro Enoshita",
              image: "https://picsum.photos/seed/dolphinora/400/300"
            },
            {
              category: "Comparativos",
              title: "BYD Dolphin Mini ou Geely EX2: qual vale a compra?",
              author: "André Deliberato",
              image: "https://picsum.photos/seed/comparativo/400/300"
            },
            {
              category: "Últimas notícias",
              title: "Toyota SW4 mantém o reinado entre SUVs grandes",
              author: "Roberto Dutra",
              image: "https://picsum.photos/seed/sw4/400/300"
            },
            {
              category: "Motos",
              title: "Honda Motos cresce nas vendas de 2024",
              author: "Redação",
              image: "https://picsum.photos/seed/motos/400/300"
            }
          ].map((item, i) => (
            <Link href="#" key={i} className="min-w-[200px] md:min-w-[240px] bg-white group block border border-black/10 hover:border-black hover:shadow-sm transition-all rounded-md overflow-hidden flex-col snap-start shrink-0 flex">
              <div className="relative aspect-[16/9] bg-black/5 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E3001B] mb-2">{item.category}</span>
                <h3 className="text-sm font-bold tracking-tight mb-2 leading-tight line-clamp-3">
                  {item.title}
                </h3>
                <p className="text-black/50 text-[9px] mt-auto uppercase tracking-wider">por {item.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-white border-t border-b border-black/10 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Compre e Venda com Segurança</h2>
            <p className="text-black/60 leading-relaxed mb-8 text-sm">
              A Seu Nome Aqui! atua no mercado de Taquaritinga e região desde 2013, oferecendo carros periciados, revisados e com garantia. A procedência que o seu próximo carro exige está aqui.
            </p>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="font-bold text-3xl tracking-tighter">12+</span>
                <span className="text-[10px] uppercase tracking-widest text-black/50">Anos de Mercado</span>
              </div>
              <div className="w-px bg-black/10"></div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl tracking-tighter">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-black/50">Veículos Periciados</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="bg-black/5 p-8 rounded-full border border-black/10">
               <div className="w-56 h-56 bg-black rounded-full flex flex-col items-center justify-center text-white p-6 text-center transform hover:scale-105 transition-transform cursor-pointer shadow-2xl">
                  <span className="font-bold text-6xl mb-2 tracking-tighter">E</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Seu Nome Aqui!</span>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
