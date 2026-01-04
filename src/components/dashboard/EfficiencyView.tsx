import { useMemo } from 'react';
import KPICard from './KPICard';
import EfficiencyScatterChart from './EfficiencyScatterChart';
import StoresTable from './StoresTable';
import { kpis, formatNumber, tiendas } from '@/data/mockData';
import { FilterState } from './FilterHeader';

interface EfficiencyViewProps {
  filters: FilterState;
}

const EfficiencyView = ({ filters }: EfficiencyViewProps) => {
  // Filtrar tiendas según los filtros aplicados
  const filteredTiendas = useMemo(() => {
    return tiendas.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });
  }, [filters]);

  const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

  // Calcular índice de atracción promedio
  const avgIndiceAtraccion = useMemo(() => {
    const filtered = filteredTiendas.filter(t => t.indiceAtraccion > 0);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, t) => sum + t.indiceAtraccion, 0) / filtered.length;
  }, [filteredTiendas]);

  // Calcular tiendas ancla vs parásito
  const tiendaStats = useMemo(() => {
    const avgTrafico = filteredTiendas.reduce((sum, t) => sum + t.trafico, 0) / (filteredTiendas.length || 1);
    const avgVentas = filteredTiendas.reduce((sum, t) => sum + t.ventas, 0) / (filteredTiendas.length || 1);
    
    const anclas = filteredTiendas.filter(t => t.trafico > avgTrafico && t.ventas > avgVentas).length;
    const ineficientes = filteredTiendas.filter(t => t.trafico > avgTrafico && t.ventas < avgVentas).length;
    
    return { anclas, ineficientes, total: filteredTiendas.length };
  }, [filteredTiendas]);

  // Calcular KPIs dinámicos
  const dynamicKPIs = useMemo(() => {
    if (filteredTiendas.length === 0) {
      return {
        ventaPorM2: 0,
        ratioConversion: 0,
        traficoTotal: 0,
      };
    }

    const ventasTotales = filteredTiendas.reduce((sum, t) => sum + t.ventas, 0);
    const m2Total = filteredTiendas.reduce((sum, t) => sum + t.m2, 0);
    const traficoTotal = filteredTiendas.reduce((sum, t) => sum + t.trafico, 0);
    const ratioConversion = filteredTiendas.reduce((sum, t) => sum + t.conversion, 0) / filteredTiendas.length;

    return {
      ventaPorM2: m2Total > 0 ? ventasTotales / m2Total : 0,
      ratioConversion,
      traficoTotal,
    };
  }, [filteredTiendas]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter indicator */}
      {isFiltered && (
        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary flex items-center gap-2">
          <span>📊</span>
          <span>
            Analizando <strong>{filteredTiendas.length}</strong> tienda{filteredTiendas.length !== 1 ? 's' : ''} 
            {filters.categoria !== 'todas' && ` en ${filters.categoria}`}
            {filters.zona !== 'todas' && ` - ${filters.zona}`}
            {filters.tienda !== 'todas' && ` (${filters.tienda})`}
          </span>
        </div>
      )}

      {/* KPIs Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Venta por m²"
          value={`S/ ${formatNumber(dynamicKPIs.ventaPorM2)}`}
          change={isFiltered ? Number((Math.random() * 10 - 2).toFixed(1)) : kpis.ventaPorM2.cambio}
          trend={dynamicKPIs.ventaPorM2 > 0 ? "up" : "neutral"}
          sparkline={kpis.ventaPorM2.historico}
          tooltip="Ventas Totales ÷ Metros Cuadrados Alquilados. Benchmark del sector: S/ 7,500/m²"
        />
        <KPICard
          title="Ratio de Conversión"
          value={`${dynamicKPIs.ratioConversion.toFixed(1)}%`}
          change={isFiltered ? Number((Math.random() * 5 - 1).toFixed(1)) : kpis.ratioConversion.cambio}
          trend={dynamicKPIs.ratioConversion > 0 ? "up" : "neutral"}
          sparkline={kpis.ratioConversion.historico}
          tooltip="(Número de Transacciones ÷ Tráfico Total) × 100"
        />
        <KPICard
          title="Índice de Atracción"
          value={avgIndiceAtraccion.toFixed(2)}
          change={isFiltered ? Number((Math.random() * 6 - 1).toFixed(1)) : 2.8}
          trend={avgIndiceAtraccion > 1 ? "up" : avgIndiceAtraccion < 1 ? "down" : "neutral"}
          tooltip="Tráfico de Tienda ÷ Tráfico Promedio de su Categoría. >1 = atrae más que el promedio"
        />
        <KPICard
          title="Tráfico Total"
          value={formatNumber(dynamicKPIs.traficoTotal)}
          unit="visitantes"
          change={isFiltered ? Number((Math.random() * 12 - 3).toFixed(1)) : kpis.traficoTotal.cambio}
          trend={dynamicKPIs.traficoTotal > 0 ? "up" : "neutral"}
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
      <EfficiencyScatterChart filters={filters} />

      {/* Stores Table */}
      <StoresTable filters={filters} />
    </div>
  );
};

export default EfficiencyView;