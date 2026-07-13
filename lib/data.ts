export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  mileage: number;
  type: 'hatch' | 'sedan' | 'picape' | 'moto' | 'quadriciclo';
  color: string;
  features: string[];
  images: string[];
  status: 'available' | 'sold';
  featured: boolean;
  description: string;
};

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Honda',
    model: 'Quadriciclo',
    version: '4x4',
    year: 2014,
    price: 19000,
    mileage: 4500,
    type: 'quadriciclo',
    color: 'Vermelho',
    features: ['4x4', 'Partida Elétrica', 'Automático'],
    images: ['https://picsum.photos/seed/quad/800/500', 'https://picsum.photos/seed/quad2/800/500'],
    status: 'available',
    featured: true,
    description: 'Quadriciclo Honda impecável, ideal para trilhas e lazer off-road. Revisado e com garantia de procedência.',
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Civic',
    version: 'LXS 1.8 AT',
    year: 2008,
    price: 35900,
    mileage: 145000,
    type: 'sedan',
    color: 'Cinza',
    features: ['Ar Condicionado', 'Direção Hidráulica', 'Câmbio Automático', 'Bancos de Couro', 'Rodas de Liga Leve'],
    images: ['https://picsum.photos/seed/civic/800/500', 'https://picsum.photos/seed/civic2/800/500'],
    status: 'available',
    featured: true,
    description: 'Honda Civic LXS automático. Conforto e confiabilidade japonesa. Carro de não fumante, documentação em dia.',
  },
  {
    id: '3',
    brand: 'Chevrolet',
    model: 'Celta',
    version: '1.0 Spirit 4P',
    year: 2010,
    price: 16500,
    mileage: 159000,
    type: 'hatch',
    color: 'Prata',
    features: ['Travas Elétricas', 'Vidros Elétricos', 'Alarme', 'Limpador Traseiro'],
    images: ['https://picsum.photos/seed/celta/800/500', 'https://picsum.photos/seed/celta2/800/500'],
    status: 'available',
    featured: false,
    description: 'Excelente custo-benefício. Econômico e manutenção barata, perfeito para o dia a dia.',
  },
  {
    id: '4',
    brand: 'Chevrolet',
    model: 'Astra',
    version: '2.0 Elegance',
    year: 2006,
    price: 18900,
    mileage: 138000,
    type: 'hatch',
    color: 'Preto',
    features: ['Ar Condicionado Digital', 'Direção Hidráulica', 'Rodas de Liga Leve', 'Farol de Neblina'],
    images: ['https://picsum.photos/seed/astra/800/500', 'https://picsum.photos/seed/astra2/800/500'],
    status: 'available',
    featured: false,
    description: 'Motor 2.0 forte e confiável. Versão Elegance completa de tudo, interior bem conservado.',
  },
  {
    id: '5',
    brand: 'Fiat',
    model: 'Strada',
    version: '1.8 Adventure CD',
    year: 2010,
    price: 42900,
    mileage: 122000,
    type: 'picape',
    color: 'Champanhe',
    features: ['Cabine Dupla', 'Capota Marítima', 'Rodas de Liga Leve', 'Som Integrado', 'Computador de Bordo'],
    images: ['https://picsum.photos/seed/strada/800/500', 'https://picsum.photos/seed/strada2/800/500'],
    status: 'available',
    featured: true,
    description: 'Picape robusta com cabine dupla. Ideal para trabalho e passeios com a família. Pneus novos.',
  },
  {
    id: '6',
    brand: 'Honda',
    model: 'Biz',
    version: '110i',
    year: 2017,
    price: 8900,
    mileage: 28000,
    type: 'moto',
    color: 'Branca',
    features: ['Injeção Eletrônica', 'Partida Elétrica', 'Painel Digital'],
    images: ['https://picsum.photos/seed/biz/800/500', 'https://picsum.photos/seed/biz2/800/500'],
    status: 'available',
    featured: false,
    description: 'Moto extremamente econômica e ágil para o trânsito da cidade. Revisada.',
  },
  {
    id: '7',
    brand: 'Toyota',
    model: 'Corolla',
    version: 'GLi 1.8 AT',
    year: 2011,
    price: 43900,
    mileage: 115000,
    type: 'sedan',
    color: 'Prata',
    features: ['Ar Condicionado', 'Direção Elétrica', 'Câmbio Automático', 'Bancos de Couro', 'Airbags'],
    images: ['https://picsum.photos/seed/corolla/800/500', 'https://picsum.photos/seed/corolla2/800/500'],
    status: 'available',
    featured: true,
    description: 'A referência do segmento sedan. Toyota Corolla muito bem cuidado, baixa quilometragem para o ano.',
  },
  {
    id: '8',
    brand: 'Chevrolet',
    model: 'Vectra',
    version: '2.0 GT',
    year: 2010,
    price: 28900,
    mileage: 98000,
    type: 'hatch',
    color: 'Prata',
    features: ['Ar Condicionado Digital', 'Direção Hidráulica', 'Piloto Automático', 'GPS Integrado'],
    images: ['https://picsum.photos/seed/vectra/800/500', 'https://picsum.photos/seed/vectra2/800/500'],
    status: 'available',
    featured: false,
    description: 'Design esportivo com conforto excepcional. Veículo com laudo cautelar aprovado.',
  },
  {
    id: '9',
    brand: 'VW',
    model: 'Voyage',
    version: '1.0 Trend',
    year: 2010,
    price: 22900,
    mileage: 110000,
    type: 'sedan',
    color: 'Branco',
    features: ['Ar Condicionado', 'Direção Hidráulica', 'Travas Elétricas', 'Vidros Elétricos Dianteiros'],
    images: ['https://picsum.photos/seed/voyage/800/500', 'https://picsum.photos/seed/voyage2/800/500'],
    status: 'available',
    featured: false,
    description: 'Sedan compacto ideal para famílias ou aplicativos. Porta-malas espaçoso.',
  }
];

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const generateWhatsAppLink = (vehicle: Vehicle) => {
  const message = `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${formatCurrency(vehicle.price)}).`;
  return `https://wa.me/5516999999999?text=${encodeURIComponent(message)}`;
};
