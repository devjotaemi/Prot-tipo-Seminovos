"use client";

import { useState } from 'react';
import { formatCurrency, Vehicle } from '@/lib/data';
import { useAppStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, SlidersHorizontal, ArrowRight, MapPin, Gauge } from 'lucide-react';

export default function EstoquePage() {
  const vehicles = useAppStore(state => state.vehicles);
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const brands = Array.from(new Set(vehicles.map(v => v.brand)));
  const types = Array.from(new Set(vehicles.map(v => v.type)));

  const filteredVehicles = vehicles.filter(v => {
    if (filterBrand && v.brand !== filterBrand) return false;
    if (filterType && v.type !== filterType) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">Nosso Estoque</h1>
          <p className="text-black/60 uppercase tracking-widest text-sm">{filteredVehicles.length} veículos disponíveis</p>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 border border-black px-4 py-2 uppercase text-xs font-bold tracking-widest"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filtros
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* FILTERS */}
        <aside className={`w-full md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 space-y-10">
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4 pb-2 border-b border-black/10">Marca</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="brand" 
                    checked={filterBrand === ''} 
                    onChange={() => setFilterBrand('')}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm uppercase tracking-wider group-hover:text-black/60 transition-colors">Todas as Marcas</span>
                </label>
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="brand" 
                      checked={filterBrand === brand} 
                      onChange={() => setFilterBrand(brand)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm uppercase tracking-wider group-hover:text-black/60 transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4 pb-2 border-b border-black/10">Categoria</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="type" 
                    checked={filterType === ''} 
                    onChange={() => setFilterType('')}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm uppercase tracking-wider group-hover:text-black/60 transition-colors">Todas as Categorias</span>
                </label>
                {types.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={filterType === type} 
                      onChange={() => setFilterType(type)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="text-sm uppercase tracking-wider group-hover:text-black/60 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => { setFilterBrand(''); setFilterType(''); }}
              className="text-xs uppercase tracking-widest font-bold text-black/50 hover:text-black transition-colors w-full text-left"
            >
              Limpar Filtros
            </button>
          </div>
        </aside>

        {/* GRID */}
        <div className="flex-1">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20 border border-black/10 bg-black/5">
              <p className="text-black/60 uppercase tracking-widest text-sm mb-4">Nenhum veículo encontrado com estes filtros.</p>
              <button 
                onClick={() => { setFilterBrand(''); setFilterType(''); }}
                className="bg-black text-white px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-black/80 transition-colors"
              >
                Limpar Busca
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredVehicles.map(vehicle => (
                <Link href={`/estoque/${vehicle.id}`} key={vehicle.id} className="group block border border-black/10 hover:border-black transition-colors bg-white">
                  <div className="relative aspect-[4/3] bg-black/5 overflow-hidden">
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold tracking-tight uppercase mb-1">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-black/60 text-xs mb-6 uppercase tracking-wider">{vehicle.version} • {vehicle.year}</p>
                    
                    <div className="flex justify-between items-center border-t border-black/10 pt-4 mb-4">
                      <span className="font-bold text-2xl tracking-tight">{formatCurrency(vehicle.price)}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-black/60 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {vehicle.mileage.toLocaleString('pt-BR')}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Taquaritinga</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
