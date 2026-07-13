"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const viewsData = [
  { name: 'Seg', visualizacoes: 400, cliquesWhatsapp: 24 },
  { name: 'Ter', visualizacoes: 300, cliquesWhatsapp: 18 },
  { name: 'Qua', visualizacoes: 550, cliquesWhatsapp: 45 },
  { name: 'Qui', visualizacoes: 480, cliquesWhatsapp: 32 },
  { name: 'Sex', visualizacoes: 600, cliquesWhatsapp: 50 },
  { name: 'Sáb', visualizacoes: 800, cliquesWhatsapp: 70 },
  { name: 'Dom', visualizacoes: 750, cliquesWhatsapp: 65 },
];

const trafficData = [
  { name: 'Instagram', value: 45 },
  { name: 'Busca Orgânica', value: 30 },
  { name: 'Tráfego Direto', value: 15 },
  { name: 'Facebook', value: 10 },
];

const inventoryTimeData = [
  { range: '0-15 dias', count: 12 },
  { range: '16-30 dias', count: 8 },
  { range: '31-60 dias', count: 5 },
  { range: '+60 dias', count: 2 },
];

const COLORS = ['#000000', '#404040', '#737373', '#A3A3A3'];

export default function InsightsPage() {
  return (
    <div className="bg-white border border-black/10 p-8 shadow-sm">
      <div className="mb-12 border-b border-black/10 pb-6">
        <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Insights & Dados</h1>
        <p className="text-xs uppercase tracking-widest text-black/50">Visão geral do desempenho da loja</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="border border-black/10 p-6 bg-black/5">
          <div className="text-xs uppercase tracking-widest text-black/60 mb-2 font-bold">Total de Visitas (7d)</div>
          <div className="text-4xl font-bold tracking-tighter">3.880</div>
          <div className="text-xs font-bold tracking-widest text-[#25D366] mt-2">+12% vs. semana anterior</div>
        </div>
        <div className="border border-black/10 p-6 bg-black/5">
          <div className="text-xs uppercase tracking-widest text-black/60 mb-2 font-bold">Cliques p/ WhatsApp</div>
          <div className="text-4xl font-bold tracking-tighter">304</div>
          <div className="text-xs font-bold tracking-widest text-[#25D366] mt-2">+5% vs. semana anterior</div>
        </div>
        <div className="border border-black/10 p-6 bg-black/5">
          <div className="text-xs uppercase tracking-widest text-black/60 mb-2 font-bold">Tempo Médio Estoque</div>
          <div className="text-4xl font-bold tracking-tighter">22<span className="text-lg">dias</span></div>
          <div className="text-xs font-bold tracking-widest text-black/40 mt-2">Dentro do aceitável</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* CHART 1 */}
        <div className="border border-black/10 p-6">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-6">Tráfego vs. Contatos (7 dias)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: 0, fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="visualizacoes" stroke="#000" strokeWidth={3} dot={{r: 4, fill: '#000'}} name="Visitas" />
                <Line type="monotone" dataKey="cliquesWhatsapp" stroke="#A3A3A3" strokeWidth={3} dot={{r: 4, fill: '#A3A3A3'}} name="Cliques Whats" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2 */}
        <div className="border border-black/10 p-6">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-6">Origem do Tráfego</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: 0, fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {trafficData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                <div className="w-3 h-3" style={{backgroundColor: COLORS[index]}}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* CHART 3 */}
        <div className="border border-black/10 p-6 lg:col-span-2">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-6">Tempo de Estoque (Giro)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryTimeData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#737373'}} />
                <Tooltip cursor={{fill: '#f5f5f5'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: 0, fontWeight: 'bold' }} />
                <Bar dataKey="count" fill="#000" name="Qtd de Veículos" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
