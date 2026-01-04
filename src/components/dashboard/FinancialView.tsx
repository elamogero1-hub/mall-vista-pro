import KPICard from './KPICard';
import SalesChart from './SalesChart';
import TopStoresChart from './TopStoresChart';
import { kpis, formatCurrency, formatNumber } from '@/data/mockData';

const FinancialView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Ventas Totales"
          value={formatCurrency(kpis.ventasTotales.valor)}
          change={kpis.ventasTotales.cambio}
          trend="up"
          sparkline={kpis.ventasTotales.historico}
          benchmark={kpis.ventasTotales.meta}
          benchmarkLabel={formatCurrency(kpis.ventasTotales.meta || 0)}
          tooltip="Suma total de ventas de todas las tiendas en el período seleccionado."
          variant="hero"
        />
        <KPICard
          title="Ticket Promedio"
          value={`S/ ${kpis.ticketPromedio.valor}`}
          change={kpis.ticketPromedio.cambio}
          trend="up"
          sparkline={kpis.ticketPromedio.historico}
          benchmark={kpis.ticketPromedio.meta}
          benchmarkLabel={`S/ ${kpis.ticketPromedio.meta}`}
          tooltip="Venta Total ÷ Número de Transacciones. Indica el gasto promedio por cliente."
          variant="hero"
        />
        <KPICard
          title="Ventas por Visitante"
          value={`S/ ${kpis.ventasPorVisitante.valor}`}
          change={kpis.ventasPorVisitante.cambio}
          trend="up"
          sparkline={kpis.ventasPorVisitante.historico}
          benchmark={kpis.ventasPorVisitante.meta}
          benchmarkLabel={`S/ ${kpis.ventasPorVisitante.meta}`}
          tooltip="Ventas Totales ÷ Número de Visitantes. Mide la rentabilidad del tráfico."
          variant="hero"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <TopStoresChart />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Tráfico Total"
          value={formatNumber(kpis.traficoTotal.valor)}
          unit="visitantes"
          change={kpis.traficoTotal.cambio}
          trend="up"
          sparkline={kpis.traficoTotal.historico}
          tooltip="Total de personas que ingresaron al mall en el período."
          variant="compact"
        />
        <KPICard
          title="Ratio de Conversión"
          value={`${kpis.ratioConversion.valor}%`}
          change={kpis.ratioConversion.cambio}
          trend="up"
          sparkline={kpis.ratioConversion.historico}
          tooltip="(Número de Ventas ÷ Tráfico) × 100. Porcentaje de visitantes que compran."
          variant="compact"
        />
        <KPICard
          title="Venta por m²"
          value={`S/ ${formatNumber(kpis.ventaPorM2.valor)}`}
          change={kpis.ventaPorM2.cambio}
          trend="up"
          sparkline={kpis.ventaPorM2.historico}
          tooltip="Ventas Totales ÷ Metros Cuadrados Alquilados. Mide eficiencia del espacio."
          variant="compact"
        />
        <KPICard
          title="Cumplimiento Meta"
          value="104.4%"
          change={4.4}
          trend="up"
          tooltip="Porcentaje de cumplimiento de la meta de ventas mensual."
          variant="compact"
        />
      </div>
    </div>
  );
};

export default FinancialView;
