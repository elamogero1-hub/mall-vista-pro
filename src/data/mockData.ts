// Mock Data para Dashboard de Centro Comercial
// Moneda: Soles Peruanos (S/)
// Zona horaria: America/Lima (UTC-5)

export interface Tienda {
  id: number;
  nombre: string;
  categoria: string;
  zona: string;
  m2: number;
  ventas: number;
  trafico: number;
  conversion: number;
  ticketPromedio: number;
  indiceAtraccion: number;
}

export interface VentasMensuales {
  mes: string;
  ventas: number;
  meta: number;
  visitantes: number;
}

export interface TraficoZona {
  zona: string;
  x: number;
  y: number;
  densidad: number;
  permanenciaPromedio: number;
}

export interface TraficoHora {
  hora: string;
  trafico: number;
}

export interface KPIData {
  valor: number;
  cambio: number;
  meta?: number;
  historico: number[];
}

// Categorías del Tenant Mix
export const categorias = [
  'Moda',
  'Restaurantes',
  'Electrónica',
  'Entretenimiento',
  'Hogar',
  'Servicios',
  'Belleza',
  'Deportes'
];

export const zonas = [
  'Primer Piso - Norte',
  'Primer Piso - Sur',
  'Primer Piso - Central',
  'Segundo Piso - Norte',
  'Segundo Piso - Sur',
  'Segundo Piso - Central',
  'Tercer Piso - Norte',
  'Tercer Piso - Sur',
  'Food Court',
  'Zona Ancla'
];

// Tiendas del Centro Comercial
export const tiendas: Tienda[] = [
  { id: 1, nombre: 'Zara', categoria: 'Moda', zona: 'Primer Piso - Central', m2: 450, ventas: 385000, trafico: 8500, conversion: 4.5, ticketPromedio: 245, indiceAtraccion: 1.45 },
  { id: 2, nombre: 'Saga Falabella', categoria: 'Moda', zona: 'Zona Ancla', m2: 2500, ventas: 1250000, trafico: 15200, conversion: 8.2, ticketPromedio: 180, indiceAtraccion: 2.1 },
  { id: 3, nombre: 'H&M', categoria: 'Moda', zona: 'Primer Piso - Norte', m2: 380, ventas: 298000, trafico: 7200, conversion: 4.1, ticketPromedio: 168, indiceAtraccion: 1.22 },
  { id: 4, nombre: 'Starbucks', categoria: 'Restaurantes', zona: 'Primer Piso - Central', m2: 85, ventas: 145000, trafico: 6800, conversion: 21.3, ticketPromedio: 32, indiceAtraccion: 1.38 },
  { id: 5, nombre: 'Pizza Hut', categoria: 'Restaurantes', zona: 'Food Court', m2: 120, ventas: 178000, trafico: 5400, conversion: 32.9, ticketPromedio: 58, indiceAtraccion: 1.15 },
  { id: 6, nombre: 'Apple Store', categoria: 'Electrónica', zona: 'Segundo Piso - Central', m2: 280, ventas: 890000, trafico: 4200, conversion: 21.2, ticketPromedio: 1850, indiceAtraccion: 1.68 },
  { id: 7, nombre: 'Samsung', categoria: 'Electrónica', zona: 'Segundo Piso - Central', m2: 180, ventas: 420000, trafico: 3100, conversion: 13.5, ticketPromedio: 1280, indiceAtraccion: 1.12 },
  { id: 8, nombre: 'Cineplanet', categoria: 'Entretenimiento', zona: 'Tercer Piso - Norte', m2: 1800, ventas: 580000, trafico: 12500, conversion: 4.6, ticketPromedio: 45, indiceAtraccion: 1.95 },
  { id: 9, nombre: 'Promart', categoria: 'Hogar', zona: 'Zona Ancla', m2: 3200, ventas: 890000, trafico: 8900, conversion: 10.0, ticketPromedio: 320, indiceAtraccion: 1.55 },
  { id: 10, nombre: 'MAC Cosmetics', categoria: 'Belleza', zona: 'Primer Piso - Sur', m2: 65, ventas: 125000, trafico: 2800, conversion: 44.6, ticketPromedio: 185, indiceAtraccion: 0.98 },
  { id: 11, nombre: 'Nike', categoria: 'Deportes', zona: 'Segundo Piso - Norte', m2: 220, ventas: 345000, trafico: 4800, conversion: 7.2, ticketPromedio: 280, indiceAtraccion: 1.32 },
  { id: 12, nombre: 'Adidas', categoria: 'Deportes', zona: 'Segundo Piso - Norte', m2: 195, ventas: 298000, trafico: 4200, conversion: 7.1, ticketPromedio: 265, indiceAtraccion: 1.18 },
  { id: 13, nombre: 'Bembos', categoria: 'Restaurantes', zona: 'Food Court', m2: 95, ventas: 165000, trafico: 6200, conversion: 26.6, ticketPromedio: 42, indiceAtraccion: 1.28 },
  { id: 14, nombre: 'Oechsle', categoria: 'Moda', zona: 'Zona Ancla', m2: 1800, ventas: 780000, trafico: 9800, conversion: 8.0, ticketPromedio: 145, indiceAtraccion: 1.42 },
  { id: 15, nombre: 'Topitop', categoria: 'Moda', zona: 'Primer Piso - Sur', m2: 320, ventas: 185000, trafico: 5600, conversion: 3.3, ticketPromedio: 95, indiceAtraccion: 0.85 },
  { id: 16, nombre: 'BCP Centro de Atención', categoria: 'Servicios', zona: 'Segundo Piso - Sur', m2: 120, ventas: 0, trafico: 2200, conversion: 0, ticketPromedio: 0, indiceAtraccion: 0.65 },
  { id: 17, nombre: 'Claro', categoria: 'Servicios', zona: 'Primer Piso - Norte', m2: 85, ventas: 245000, trafico: 1800, conversion: 13.6, ticketPromedio: 420, indiceAtraccion: 0.72 },
  { id: 18, nombre: 'Casa Ideas', categoria: 'Hogar', zona: 'Segundo Piso - Sur', m2: 480, ventas: 320000, trafico: 3500, conversion: 9.1, ticketPromedio: 185, indiceAtraccion: 1.08 },
  { id: 19, nombre: 'Lush', categoria: 'Belleza', zona: 'Primer Piso - Central', m2: 55, ventas: 98000, trafico: 2400, conversion: 40.8, ticketPromedio: 145, indiceAtraccion: 1.15 },
  { id: 20, nombre: 'Tommy Hilfiger', categoria: 'Moda', zona: 'Primer Piso - Norte', m2: 180, ventas: 275000, trafico: 2100, conversion: 13.1, ticketPromedio: 485, indiceAtraccion: 0.92 },
];

// Ventas mensuales (últimos 12 meses)
export const ventasMensuales: VentasMensuales[] = [
  { mes: 'Ene 2025', ventas: 6850000, meta: 7000000, visitantes: 185000 },
  { mes: 'Feb 2025', ventas: 6420000, meta: 6500000, visitantes: 172000 },
  { mes: 'Mar 2025', ventas: 7150000, meta: 7200000, visitantes: 195000 },
  { mes: 'Abr 2025', ventas: 6980000, meta: 7000000, visitantes: 188000 },
  { mes: 'May 2025', ventas: 8250000, meta: 7500000, visitantes: 215000 },
  { mes: 'Jun 2025', ventas: 7680000, meta: 7800000, visitantes: 198000 },
  { mes: 'Jul 2025', ventas: 9450000, meta: 8500000, visitantes: 245000 },
  { mes: 'Ago 2025', ventas: 8120000, meta: 8000000, visitantes: 212000 },
  { mes: 'Sep 2025', ventas: 7890000, meta: 8200000, visitantes: 205000 },
  { mes: 'Oct 2025', ventas: 8650000, meta: 8500000, visitantes: 228000 },
  { mes: 'Nov 2025', ventas: 9280000, meta: 9000000, visitantes: 248000 },
  { mes: 'Dic 2025', ventas: 12450000, meta: 12000000, visitantes: 320000 },
];

// Tráfico por zona para Heatmap
export const traficoZonas: TraficoZona[] = [
  { zona: 'Entrada Principal', x: 50, y: 90, densidad: 0.95, permanenciaPromedio: 2.5 },
  { zona: 'Pasillo Central P1', x: 50, y: 70, densidad: 0.88, permanenciaPromedio: 8.2 },
  { zona: 'Zona Norte P1', x: 25, y: 65, densidad: 0.72, permanenciaPromedio: 12.5 },
  { zona: 'Zona Sur P1', x: 75, y: 65, densidad: 0.68, permanenciaPromedio: 11.8 },
  { zona: 'Escaleras Norte', x: 20, y: 50, densidad: 0.55, permanenciaPromedio: 1.2 },
  { zona: 'Escaleras Sur', x: 80, y: 50, densidad: 0.52, permanenciaPromedio: 1.5 },
  { zona: 'Pasillo Central P2', x: 50, y: 45, densidad: 0.65, permanenciaPromedio: 15.3 },
  { zona: 'Food Court', x: 50, y: 25, densidad: 0.92, permanenciaPromedio: 45.8 },
  { zona: 'Zona Ancla Oeste', x: 15, y: 40, densidad: 0.78, permanenciaPromedio: 28.5 },
  { zona: 'Zona Ancla Este', x: 85, y: 40, densidad: 0.75, permanenciaPromedio: 25.2 },
  { zona: 'Entretenimiento P3', x: 50, y: 15, densidad: 0.82, permanenciaPromedio: 120.5 },
  { zona: 'Servicios P2', x: 30, y: 35, densidad: 0.35, permanenciaPromedio: 18.2 },
];

// Tráfico por hora del día
export const traficoPorHora: TraficoHora[] = [
  { hora: '10:00', trafico: 850 },
  { hora: '11:00', trafico: 1250 },
  { hora: '12:00', trafico: 2100 },
  { hora: '13:00', trafico: 2850 },
  { hora: '14:00', trafico: 2650 },
  { hora: '15:00', trafico: 2200 },
  { hora: '16:00', trafico: 2450 },
  { hora: '17:00', trafico: 2950 },
  { hora: '18:00', trafico: 3450 },
  { hora: '19:00', trafico: 3850 },
  { hora: '20:00', trafico: 3650 },
  { hora: '21:00', trafico: 2850 },
  { hora: '22:00', trafico: 1450 },
];

// KPIs principales
export const kpis = {
  ventasTotales: {
    valor: 99170000,
    cambio: 12.5,
    meta: 95000000,
    historico: [6.8, 6.4, 7.1, 6.9, 8.2, 7.6, 9.4, 8.1, 7.8, 8.6, 9.2, 12.4],
  } as KPIData,
  ticketPromedio: {
    valor: 185,
    cambio: 5.8,
    meta: 175,
    historico: [168, 172, 175, 178, 182, 185, 188, 184, 181, 186, 190, 195],
  } as KPIData,
  ventasPorVisitante: {
    valor: 38.5,
    cambio: 3.2,
    meta: 35,
    historico: [35.2, 36.1, 36.8, 37.2, 38.5, 38.8, 38.6, 38.3, 38.5, 37.9, 37.4, 38.9],
  } as KPIData,
  traficoTotal: {
    valor: 2611000,
    cambio: 8.9,
    meta: 2400000,
    historico: [185, 172, 195, 188, 215, 198, 245, 212, 205, 228, 248, 320],
  } as KPIData,
  ventaPorM2: {
    valor: 8250,
    cambio: 6.2,
    historico: [7200, 7400, 7650, 7800, 8100, 8000, 8350, 8150, 8050, 8280, 8400, 8520],
  } as KPIData,
  ratioConversion: {
    valor: 12.8,
    cambio: 1.5,
    meta: 12,
    historico: [11.2, 11.5, 11.8, 12.0, 12.2, 12.4, 12.6, 12.5, 12.3, 12.7, 12.9, 13.1],
  } as KPIData,
};

// Formatear moneda en Soles Peruanos
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Formatear números grandes
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
};

// Formatear porcentaje
export const formatPercent = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};
