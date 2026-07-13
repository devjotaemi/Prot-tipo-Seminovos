"use client";

import { useAppStore } from '@/store';
import { MessageCircle, Trash2, Download } from 'lucide-react';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'novo': return "bg-[#25D366]/20 text-[#1EBE5D] border-[#25D366]/30";
    case 'em_negociacao': return "bg-blue-50 text-blue-600 border-blue-200";
    case 'vendido': return "bg-black text-white border-black";
    case 'esfriou': return "bg-orange-50 text-orange-600 border-orange-200";
    default: return "bg-black/5 text-black border-black/10";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'novo': return "Novo";
    case 'em_negociacao': return "Em Negociação";
    case 'vendido': return "Vendido";
    case 'esfriou': return "Esfriou";
    default: return status;
  }
};

export default function LeadsPage() {
  const { leads, deleteLead } = useAppStore();

  const handleDownloadCSV = () => {
    const header = ['Nome', 'Telefone', 'CEP', 'Veículo Interesse', 'Status', 'Data'];
    const rows = leads.map(l => [l.name, l.phone, l.cep, l.vehicleInterest, l.status, l.date]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [header.join(','), ...rows.map(e => e.join(','))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getWhatsAppLink = (lead: any) => {
    const msg = `Olá ${lead.name}, somos da Seu Nome Aqui!. Vimos seu interesse no ${lead.vehicleInterest}. Como podemos te ajudar hoje?`;
    return `https://wa.me/${lead.phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white border border-black/10 p-8 shadow-sm min-h-[calc(100vh-8rem)]">
      <div className="mb-8 border-b border-black/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Clientes & Leads</h1>
          <p className="text-xs uppercase tracking-widest text-black/50">Gerencie contatos e dados de clientes</p>
        </div>
        <button onClick={handleDownloadCSV} className="flex items-center gap-2 bg-black text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
          <Download className="w-4 h-4" /> Baixar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Cliente / CEP</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Veículo de Interesse</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60">Status</th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-black/60 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm uppercase tracking-widest text-black/50 font-bold">
                  Nenhum lead encontrado.
                </td>
              </tr>
            ) : (
              leads.map(lead => (
                <tr key={lead.id} className="border-b border-black/10 hover:bg-black/5 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="font-bold uppercase tracking-wider text-sm">{lead.name}</div>
                    <div className="text-xs tracking-widest text-black/50">CEP: {lead.cep}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold uppercase tracking-wider">{lead.vehicleInterest}</div>
                    <div className="text-[10px] uppercase tracking-widest text-black/40">{lead.date}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 border ${getStatusStyle(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a 
                        href={getWhatsAppLink(lead)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366] text-white p-2 hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                        title="Falar no WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" /> Falar
                      </a>
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        title="Excluir Dados (LGPD)" 
                        className="p-2 text-red-500/50 hover:text-red-600 hover:bg-red-50 transition-colors border border-black/10 bg-white flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
