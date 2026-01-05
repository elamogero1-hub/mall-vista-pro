
import { KPIData, tiendas, formatCurrency } from './mockData';

export { formatCurrency };

export interface AtribucionDiaria {
  fecha: string;
  likes: number;
  ventasAtribuidas: number;
}

export interface CampanaROI {
  id: number;
  nombre: string;
  roi: number;
  ventasAtribuidas: number;
}

export interface TiendaMarketing {
  id: number;
  nombre: string;
  categoria: string;
  zona: string;
  conversionDigital: number;
  indiceAtraccion: number;
}

// KPI Data for Marketing Dashboard
export const kpisMarketing = {
  tasaConversionOmnicanal: {
    valor: 8.5,
    cambio: 2.1,
    meta: 8.0,
    historico: [7.2, 7.5, 7.8, 8.0, 8.2, 8.1, 8.3, 8.4, 8.5, 8.2, 8.4, 8.5]
  } as KPIData,
  visitasDigitales: {
    valor: 145200,
    cambio: 12.5,
    meta: 130000,
    historico: [120000, 125000, 128000, 130000, 135000, 138000, 140000, 142000, 143000, 144000, 145000, 145200]
  } as KPIData,
  indiceAtraccionDigital: {
    valor: 1.45,
    cambio: 5.4,
    meta: 1.2,
    historico: [1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.32, 1.38, 1.4, 1.42, 1.44, 1.45]
  } as KPIData,
  ventasAtribuidas: {
    valor: 4580000,
    cambio: 15.2,
    meta: 4000000,
    historico: [3.2, 3.4, 3.5, 3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.55, 4.58] // Scaled down representation
  } as KPIData,
  ticketPromedioDigital: {
    valor: 245,
    cambio: 8.5,
    meta: 220,
    historico: [210, 215, 220, 225, 230, 235, 232, 238, 240, 242, 244, 245]
  } as KPIData,
  ticketPromedioOrganico: {
    valor: 185,
    cambio: 2.1,
    meta: 180,
    historico: [175, 178, 180, 182, 183, 184, 185, 184, 183, 184, 185, 185]
  } as KPIData
};

// Evolución de Atribución Temporal (Likes vs Ventas Atribuidas)
export const atribucionTemporal: AtribucionDiaria[] = [
  { fecha: '01 May', likes: 1450, ventasAtribuidas: 42000 },
  { fecha: '02 May', likes: 1320, ventasAtribuidas: 38500 },
  { fecha: '03 May', likes: 1580, ventasAtribuidas: 48000 },
  { fecha: '04 May', likes: 1950, ventasAtribuidas: 65000 },
  { fecha: '05 May', likes: 2100, ventasAtribuidas: 72000 },
  { fecha: '06 May', likes: 1850, ventasAtribuidas: 58000 },
  { fecha: '07 May', likes: 1650, ventasAtribuidas: 49000 },
  { fecha: '08 May', likes: 1520, ventasAtribuidas: 44000 },
  { fecha: '09 May', likes: 1780, ventasAtribuidas: 54000 },
  { fecha: '10 May', likes: 2250, ventasAtribuidas: 78000 },
  { fecha: '11 May', likes: 2450, ventasAtribuidas: 85000 },
  { fecha: '12 May', likes: 2100, ventasAtribuidas: 68000 },
  { fecha: '13 May', likes: 1680, ventasAtribuidas: 51000 },
  { fecha: '14 May', likes: 1550, ventasAtribuidas: 46000 },
  { fecha: '15 May', likes: 1980, ventasAtribuidas: 62000 },
  { fecha: '16 May', likes: 2350, ventasAtribuidas: 82000 },
  { fecha: '17 May', likes: 2550, ventasAtribuidas: 89000 },
  { fecha: '18 May', likes: 2200, ventasAtribuidas: 71000 },
  { fecha: '19 May', likes: 1750, ventasAtribuidas: 53000 },
  { fecha: '20 May', likes: 1620, ventasAtribuidas: 48000 },
  { fecha: '21 May', likes: 1890, ventasAtribuidas: 59000 },
  { fecha: '22 May', likes: 2420, ventasAtribuidas: 84000 },
  { fecha: '23 May', likes: 2680, ventasAtribuidas: 92000 },
  { fecha: '24 May', likes: 2350, ventasAtribuidas: 76000 },
  { fecha: '25 May', likes: 1820, ventasAtribuidas: 56000 },
  { fecha: '26 May', likes: 1750, ventasAtribuidas: 52000 },
  { fecha: '27 May', likes: 1920, ventasAtribuidas: 61000 },
  { fecha: '28 May', likes: 2550, ventasAtribuidas: 88000 },
  { fecha: '29 May', likes: 2750, ventasAtribuidas: 95000 },
  { fecha: '30 May', likes: 2480, ventasAtribuidas: 81000 },
  { fecha: '31 May', likes: 1950, ventasAtribuidas: 64000 },
];

// Top Campañas por ROI
export const topCampanas: CampanaROI[] = [
  { id: 1, nombre: 'Verano Fashion 2025', roi: 18.5, ventasAtribuidas: 450000 },
  { id: 2, nombre: 'Promo Cyber Days', roi: 16.2, ventasAtribuidas: 380000 },
  { id: 3, nombre: 'Día de la Madre', roi: 14.8, ventasAtribuidas: 520000 },
  { id: 4, nombre: 'Back to School', roi: 12.5, ventasAtribuidas: 280000 },
  { id: 5, nombre: 'Liquidación Invierno', roi: 11.2, ventasAtribuidas: 190000 },
  { id: 6, nombre: 'Nuevos Restaurantes', roi: 9.8, ventasAtribuidas: 150000 },
  { id: 7, nombre: 'Tech Fest', roi: 8.5, ventasAtribuidas: 220000 },
  { id: 8, nombre: 'Feria del Hogar', roi: 7.2, ventasAtribuidas: 120000 },
];

// Detalle por Tienda (Derived from tiendas mockData but simplified/augmented for Marketing view)
export const tiendasMarketing: TiendaMarketing[] = tiendas.map(t => ({
  id: t.id,
  nombre: t.nombre,
  categoria: t.categoria,
  zona: t.zona,
  conversionDigital: t.conversion * 0.8 + Math.random() * 2, // Mock logic
  indiceAtraccion: t.indiceAtraccion
})).sort((a, b) => b.conversionDigital - a.conversionDigital);
