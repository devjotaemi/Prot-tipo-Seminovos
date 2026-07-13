"use client";

import { useState } from 'react';
import { formatCurrency, Vehicle } from '@/lib/data';
import { useAppStore } from '@/store';
import { Plus, Edit3, Trash2, CheckCircle2, X, Star } from 'lucide-react';
import Image from 'next/image';

export default function AdminVehiclesPage() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    brand: '',
    model: '',
    version: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    type: 'hatch',
    color: '',
    features: [],
    images: ['https://picsum.photos/seed/newcar/800/500'],
    status: 'available',
    featured: false,
    description: '',
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      brand: '', model: '', version: '', year: 2020, price: 0, mileage: 0,
      type: 'hatch', color: '', features: [], images: ['https://picsum.photos/seed/newcar/800/500'], status: 'available', featured: false, description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingId(v.id);
    setFormData(v);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateVehicle(editingId, formData);
    } else {
      addVehicle({
        ...formData,
        id: Math.random().toString(36).substring(7),
        features: formData.features || [],
        images: formData.images || [],
      } as Vehicle);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-black/10 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-black/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Gestão de Estoque</h1>
          <p className="text-xs uppercase tracking-widest text-black/50">Gerencie seus anúncios</p>
        </div>
        <button onClick={handleOpenNew} className="bg-black text-white px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-black/80 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo Veículo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Veículo</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Preço</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Status</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v.id} className="border-b border-black/10 hover:bg-black/5 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 bg-black/10 shrink-0">
                      <Image src={v.images[0]} fill alt="Thumb" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                        {v.brand} {v.model}
                        {v.featured && <Star className="w-3 h-3 text-black fill-black" />}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-black/50">{v.year} • {v.mileage}km</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-bold tracking-tight">{formatCurrency(v.price)}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs uppercase font-bold tracking-widest px-2 py-1 ${v.status === 'sold' ? 'bg-black text-white' : 'bg-black/10 text-black'}`}>
                    {v.status === 'sold' ? 'Vendido' : 'Disponível'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => updateVehicle(v.id, { featured: !v.featured })}
                      title="Destacar" 
                      className={`p-2 transition-colors border border-transparent hover:border-black/10 bg-white ${v.featured ? 'text-black' : 'text-black/50 hover:text-black'}`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => updateVehicle(v.id, { status: v.status === 'available' ? 'sold' : 'available' })}
                      title="Marcar como Vendido/Disponível" 
                      className="p-2 text-black/50 hover:text-black transition-colors border border-transparent hover:border-black/10 bg-white"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleOpenEdit(v)} title="Editar" className="p-2 text-black/50 hover:text-black transition-colors border border-transparent hover:border-black/10 bg-white">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteVehicle(v.id)} title="Excluir" className="p-2 text-red-500/50 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 bg-white">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-black/10 pb-4 mb-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">{editingId ? 'Editar Veículo' : 'Novo Veículo'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Marca</label>
                <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Modelo</label>
                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Versão</label>
                <input value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Ano</label>
                <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Preço</label>
                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Quilometragem</label>
                <input type="number" value={formData.mileage} onChange={e => setFormData({...formData, mileage: Number(e.target.value)})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Cor</label>
                <input value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full border border-black/20 p-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Descrição Breve</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-black/20 p-2 text-sm h-24" />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-black uppercase text-xs font-bold tracking-widest hover:bg-black/5">Cancelar</button>
              <button onClick={handleSave} className="bg-black text-white px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-black/80">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
