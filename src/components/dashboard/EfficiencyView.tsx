import KPICard from './KPICard';
import EfficiencyScatterChart from './EfficiencyScatterChart';
import StoresTable from './StoresTable';
import { kpis, formatNumber, tiendas } from '@/data/mockData';
import { useMemo } from 'react';

const EfficiencyView = () => {
  // Calcular índice de atracción promedio
  const avgIndiceAtraccion = useMemo(() => {
    const filtered = tiendas.filter(t => t.indiceAtraccion > 0);
    return filtered.reduce((sum, t) => sum + t.indiceAtraccion, 0) / filtered.length;
  }, []);

  // Calcular tiendas ancla vs parásito
  const tiendaStats = useMemo(() => {
    const avgTrafico = tiendas.reduce((sum, t) => sum + t.trafico, 0) / tiendas.length;
    const avgVentas = tiendas.reduce((sum, t) => sum + t.ventas, 0) / tiendas.length;
    
    const anclas = tiendas.filter(t => t.trafico > avgTrafico && t.ventas > avgVentas).length;
    const ineficientes = tiendas.filter(t => t.trafico > avgTrafico && t.ventas < avgVentas).length;
    
    return { anclas, ineficientes, total: tiendas.length };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Venta por m²"
          value={`S/ ${formatNumber(kpis.ventaPorM2.valor)}`}
          change={kpis.ventaPorM2.cambio}
          trend="up"
          sparkline={kpis.ventaPorM2.historico}
          tooltip="Ventas Totales ÷ Metros Cuadrados Alquilados. Benchmark del sector: S/ 7,500/m²"
        />
        <KPICard
          title="Ratio de Conversión"
          value={`${kpis.ratioConversion.valor}%`}
          change={kpis.ratioConversion.cambio}
          trend="up"
          sparkline={kpis.ratioConversion.historico}
          tooltip="(Número de Transacciones ÷ Tráfico Total) × 100"
        />
        <KPICard
          title="Índice de Atracción"
          value={avgIndiceAtraccion.toFixed(2)}
          change={2.8}
          trend="up"
          tooltip="Tráfico de Tienda ÷ Tráfico Promedio de su Categoría. >1 = atrae más que el promedio"
        />
        <KPICard
          title="Tráfico Total"
          value={formatNumber(kpis.traficoTotal.valor)}
          unit="visitantes"
          change={kpis.traficoTotal.cambio}
          trend="up"
          sparkline={kpis.traficoTotal.historico}
          tooltip="Total de visitantes registrados por cámaras en todas las entradas"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Tiendas Ancla</p>
            <p className="text-2xl font-bold text-success">{tiendaStats.anclas}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
            <span className="text-success text-lg">⭐</span>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Tiendas Ineficientes</p>
            <p className="text-2xl font-bold text-warning">{tiendaStats.ineficientes}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
            <span className="text-warning text-lg">⚠️</span>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Locales Activos</p>
            <p className="text-2xl font-bold text-foreground">{tiendaStats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-lg">🏪</span>
          </div>
        </div>
      </div>

      {/* Scatter Chart */}
      <EfficiencyScatterChart />

      {/* Stores Table */}
      <StoresTable />
    </div>
  );
};

export default EfficiencyView;
