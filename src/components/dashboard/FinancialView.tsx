import { useMemo } from 'react';
import KPICard from './KPICard';
import SalesChart from './SalesChart';
import TopStoresChart from './TopStoresChart';
import { kpis, formatCurrency, formatNumber, tiendas, ventasMensuales } from '@/data/mockData';
import { FilterState } from './FilterHeader';

interface FinancialViewProps {
  filters: FilterState;
}

const FinancialView = ({ filters }: FinancialViewProps) => {
  // Filtrar tiendas según los filtros aplicados
  const filteredTiendas = useMemo(() => {
    return tiendas.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });
  }, [filters]);

  // Calcular KPIs dinámicos basados en filtros
  const dynamicKPIs = useMemo(() => {
    if (filteredTiendas.length === 0) {
      return {
        ventasTotales: 0,
        ticketPromedio: 0,
        ventasPorVisitante: 0,
        traficoTotal: 0,
        ventaPorM2: 0,
        ratioConversion: 0,
        cumplimientoMeta: 0,
      };
    }

    const ventasTotales = filteredTiendas.reduce((sum, t) => sum + t.ventas, 0);
    const traficoTotal = filteredTiendas.reduce((sum, t) => sum + t.trafico, 0);
    const m2Total = filteredTiendas.reduce((sum, t) => sum + t.m2, 0);
    const ticketPromedio = filteredTiendas.reduce((sum, t) => sum + t.ticketPromedio, 0) / filteredTiendas.length;
    const ventasPorVisitante = traficoTotal > 0 ? ventasTotales / traficoTotal : 0;
    const ventaPorM2 = m2Total > 0 ? ventasTotales / m2Total : 0;
    const ratioConversion = filteredTiendas.reduce((sum, t) => sum + t.conversion, 0) / filteredTiendas.length;

    // Meta proporcional
    const metaTotal = kpis.ventasTotales.meta || 95000000;
    const proporcion = filteredTiendas.length / tiendas.length;
    const metaProporcional = metaTotal * proporcion;
    const cumplimientoMeta = metaProporcional > 0 ? (ventasTotales / metaProporcional) * 100 : 0;

    return {
      ventasTotales,
      ticketPromedio,
      ventasPorVisitante,
      traficoTotal,
      ventaPorM2,
      ratioConversion,
      cumplimientoMeta,
    };
  }, [filteredTiendas]);

  // Calcular cambio simulado (comparación con período anterior)
  const calculateChange = (baseValue: number) => {
    // Simular variación basada en cantidad de filtros
    const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';
    return isFiltered ? (Math.random() * 10 - 2).toFixed(1) : kpis.ventasTotales.cambio;
  };

  const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter indicator */}
      {isFiltered && (
        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary flex items-center gap-2">
          <span>📊</span>
          <span>
            Mostrando datos de <strong>{filteredTiendas.length}</strong> tienda{filteredTiendas.length !== 1 ? 's' : ''} 
            {filters.categoria !== 'todas' && ` en ${filters.categoria}`}
            {filters.zona !== 'todas' && ` - ${filters.zona}`}
            {filters.tienda !== 'todas' && ` (${filters.tienda})`}
          </span>
        </div>
      )}

      {/* Hero KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Ventas Totales"
          value={formatCurrency(dynamicKPIs.ventasTotales)}
          change={isFiltered ? Number(calculateChange(dynamicKPIs.ventasTotales)) : kpis.ventasTotales.cambio}
          trend={dynamicKPIs.ventasTotales > 0 ? "up" : "neutral"}
          sparkline={kpis.ventasTotales.historico}
          benchmark={isFiltered ? undefined : kpis.ventasTotales.meta}
          benchmarkLabel={isFiltered ? undefined : formatCurrency(kpis.ventasTotales.meta || 0)}
          tooltip="Suma total de ventas de todas las tiendas en el período seleccionado."
          variant="hero"
        />
        <KPICard
          title="Ticket Promedio"
          value={`S/ ${Math.round(dynamicKPIs.ticketPromedio)}`}
          change={isFiltered ? Number((Math.random() * 8 - 1).toFixed(1)) : kpis.ticketPromedio.cambio}
          trend={dynamicKPIs.ticketPromedio > 0 ? "up" : "neutral"}
          sparkline={kpis.ticketPromedio.historico}
          benchmark={isFiltered ? undefined : kpis.ticketPromedio.meta}
          benchmarkLabel={isFiltered ? undefined : `S/ ${kpis.ticketPromedio.meta}`}
          tooltip="Venta Total ÷ Número de Transacciones. Indica el gasto promedio por cliente."
          variant="hero"
        />
        <KPICard
          title="Ventas por Visitante"
          value={`S/ ${dynamicKPIs.ventasPorVisitante.toFixed(1)}`}
          change={isFiltered ? Number((Math.random() * 6 - 1).toFixed(1)) : kpis.ventasPorVisitante.cambio}
          trend={dynamicKPIs.ventasPorVisitante > 0 ? "up" : "neutral"}
          sparkline={kpis.ventasPorVisitante.historico}
          benchmark={isFiltered ? undefined : kpis.ventasPorVisitante.meta}
          benchmarkLabel={isFiltered ? undefined : `S/ ${kpis.ventasPorVisitante.meta}`}
          tooltip="Ventas Totales ÷ Número de Visitantes. Mide la rentabilidad del tráfico."
          variant="hero"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart filters={filters} />
        <TopStoresChart filters={filters} />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Tráfico Total"
          value={formatNumber(dynamicKPIs.traficoTotal)}
          unit="visitantes"
          change={isFiltered ? Number((Math.random() * 12 - 2).toFixed(1)) : kpis.traficoTotal.cambio}
          trend={dynamicKPIs.traficoTotal > 0 ? "up" : "neutral"}
          sparkline={kpis.traficoTotal.historico}
          tooltip="Total de personas que ingresaron al mall en el período."
          variant="compact"
        />
        <KPICard
          title="Ratio de Conversión"
          value={`${dynamicKPIs.ratioConversion.toFixed(1)}%`}
          change={isFiltered ? Number((Math.random() * 4 - 0.5).toFixed(1)) : kpis.ratioConversion.cambio}
          trend={dynamicKPIs.ratioConversion > 0 ? "up" : "neutral"}
          sparkline={kpis.ratioConversion.historico}
          tooltip="(Número de Ventas ÷ Tráfico) × 100. Porcentaje de visitantes que compran."
          variant="compact"
        />
        <KPICard
          title="Venta por m²"
          value={`S/ ${formatNumber(dynamicKPIs.ventaPorM2)}`}
          change={isFiltered ? Number((Math.random() * 8 - 1).toFixed(1)) : kpis.ventaPorM2.cambio}
          trend={dynamicKPIs.ventaPorM2 > 0 ? "up" : "neutral"}
          sparkline={kpis.ventaPorM2.historico}
          tooltip="Ventas Totales ÷ Metros Cuadrados Alquilados. Mide eficiencia del espacio."
          variant="compact"
        />
        <KPICard
          title="Cumplimiento Meta"
          value={`${dynamicKPIs.cumplimientoMeta.toFixed(1)}%`}
          change={dynamicKPIs.cumplimientoMeta > 100 ? dynamicKPIs.cumplimientoMeta - 100 : -(100 - dynamicKPIs.cumplimientoMeta)}
          trend={dynamicKPIs.cumplimientoMeta >= 100 ? "up" : "down"}
          tooltip="Porcentaje de cumplimiento de la meta de ventas mensual."
          variant="compact"
        />
      </div>
    </div>
  );
};

export default FinancialView;