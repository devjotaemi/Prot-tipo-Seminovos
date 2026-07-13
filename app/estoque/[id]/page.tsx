"use client";

import { use, useState } from 'react';
import { formatCurrency, generateWhatsAppLink } from '@/lib/data';
import { useAppStore } from '@/store';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Check, Info, Calendar, Gauge, Settings, ShieldCheck, Calculator } from 'lucide-react';

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = useAppStore(state => state.vehicles.find(v => v.id === id));
  
  const [downPayment, setDownPayment] = useState<number>(vehicle ? vehicle.price * 0.3 : 0);
  const [installments, setInstallments] = useState<number>(48);

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-6">Veículo não encontrado</h1>
        <Link href="/estoque" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-black/60 transition-colors">Voltar ao Estoque</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Top Bar Navigation */}
      <div className="border-b border-black/10 bg-black/5">
        <div className="container mx-auto px-4 py-4">
          <Link href="/estoque" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-black/60 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Estoque
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT: Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full bg-black/5 border border-black/10">
              <Image 
                src={vehicle.images[0]} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {vehicle.images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] bg-black/5 border border-black/10 hover:border-black cursor-pointer transition-colors">
                    <Image src={img} fill alt="Detalhe" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div>
            <div className="mb-8 border-b border-black/10 pb-8">
              <div className="uppercase tracking-widest text-xs font-bold text-black/50 mb-2">{vehicle.brand}</div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">
                {vehicle.model}
              </h1>
              <p className="text-lg text-black/60 uppercase tracking-widest mb-4">{vehicle.version}</p>
              
              <div className="text-5xl font-bold tracking-tighter mb-6">
                {formatCurrency(vehicle.price)}
              </div>

              <p className="text-sm text-black/80 font-light leading-relaxed mb-4">
                {vehicle.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div>
                <div className="text-black/50 mb-2"><Calendar className="w-5 h-5" /></div>
                <div className="text-xs uppercase tracking-widest font-bold">Ano</div>
                <div className="text-lg">{vehicle.year}</div>
              </div>
              <div>
                <div className="text-black/50 mb-2"><Gauge className="w-5 h-5" /></div>
                <div className="text-xs uppercase tracking-widest font-bold">Km</div>
                <div className="text-lg">{vehicle.mileage.toLocaleString('pt-BR')}</div>
              </div>
              <div>
                <div className="text-black/50 mb-2"><Settings className="w-5 h-5" /></div>
                <div className="text-xs uppercase tracking-widest font-bold">Cor</div>
                <div className="text-lg">{vehicle.color}</div>
              </div>
              <div>
                <div className="text-black/50 mb-2"><Info className="w-5 h-5" /></div>
                <div className="text-xs uppercase tracking-widest font-bold">Tipo</div>
                <div className="text-lg capitalize">{vehicle.type}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black/5 border border-black/10 p-8 mb-12 flex flex-col items-center text-center">
              <ShieldCheck className="w-10 h-10 mb-4 text-black/40" />
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Garantia de Procedência</h3>
              <p className="text-black/60 text-sm mb-8 font-light">Veículo periciado e aprovado. Agende sua visita ou simule um financiamento agora mesmo.</p>
              <a 
                href={generateWhatsAppLink(vehicle)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white px-8 py-5 uppercase font-bold tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-5 h-5" /> Falar com Vendedor
              </a>
            </div>

            {/* SIMULATOR */}
            <div className="border border-black/10 p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6" />
                <h3 className="text-xl font-bold tracking-tighter uppercase">Simular Financiamento</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-widest text-black/60 mb-2">
                    Entrada (R$)
                  </label>
                  <input 
                    type="range" 
                    min={0} 
                    max={vehicle.price} 
                    step={1000}
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full accent-black h-2 bg-black/10 rounded-none appearance-none"
                  />
                  <div className="flex justify-between mt-2 text-sm font-bold">
                    <span>{formatCurrency(downPayment)}</span>
                    <span className="text-black/40">Restante: {formatCurrency(vehicle.price - downPayment)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-widest text-black/60 mb-2">
                    Parcelas
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[12, 24, 36, 48, 60].map(num => (
                      <button 
                        key={num}
                        onClick={() => setInstallments(num)}
                        className={`py-3 text-sm font-bold border transition-colors ${
                          installments === num 
                          ? 'border-black bg-black text-white' 
                          : 'border-black/10 hover:border-black/30'
                        }`}
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-black/5 p-6 mt-6 border border-black/10 text-center">
                  <div className="text-xs uppercase font-bold tracking-widest text-black/60 mb-1">
                    Parcela Estimada (Simulação)*
                  </div>
                  <div className="text-4xl font-bold tracking-tighter">
                    {formatCurrency(((vehicle.price - downPayment) * 1.5) / installments)}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 mt-4 text-left">
                    * Valor aproximado considerando taxa média de mercado de 1.99% a.m. Sujeito a análise de crédito.
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold tracking-tighter uppercase mb-6">Opcionais</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {vehicle.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black/80 font-light uppercase tracking-wider">
                    <Check className="w-4 h-4 text-black" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
