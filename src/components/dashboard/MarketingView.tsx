
import KPICard from './KPICard';
import MarketingAttributionChart from './MarketingAttributionChart';
import MarketingCampaignsChart from './MarketingCampaignsChart';
import MarketingStoresTable from './MarketingStoresTable';
import { kpisMarketing } from '@/data/marketingData';
import { FilterState } from './FilterHeader';
import { Users, MousePointerClick, ShoppingBag, CreditCard } from 'lucide-react';

interface MarketingViewProps {
  filters: FilterState;
}

const MarketingView = ({ filters }: MarketingViewProps) => {
  // En una aplicación real, aquí filtraríamos los KPIs según los filtros globales
  // Por ahora usaremos los datos mock estáticos pero ajustados simuladamente
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Fila de KPIs Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Tasa de Conversión Omnicanal"
          value={`${kpisMarketing.tasaConversionOmnicanal.valor}%`}
          change={kpisMarketing.tasaConversionOmnicanal.cambio}
          trend="up"
          benchmark={kpisMarketing.tasaConversionOmnicanal.meta}
          benchmarkLabel="Meta"
          tooltip="Clientes con Hash en Likes que compraron / Total Clientes con Hash en Likes"
          sparkline={kpisMarketing.tasaConversionOmnicanal.historico}
        />
        
        <KPICard
          title="Índice de Atracción Digital"
          value={kpisMarketing.indiceAtraccionDigital.valor.toFixed(2)}
          change={kpisMarketing.indiceAtraccionDigital.cambio}
          trend="up"
          benchmark={kpisMarketing.indiceAtraccionDigital.meta}
          benchmarkLabel="Meta"
          tooltip="Engagement Digital / Tráfico de Zona"
          sparkline={kpisMarketing.indiceAtraccionDigital.historico}
        />
        
        <KPICard
          title="Ventas Atribuidas Totales"
          value={`S/ ${(kpisMarketing.ventasAtribuidas.valor / 1000000).toFixed(2)}M`}
          change={kpisMarketing.ventasAtribuidas.cambio}
          trend="up"
          benchmark={kpisMarketing.ventasAtribuidas.meta}
          benchmarkLabel="Meta"
          tooltip="Monto total de tickets que tuvieron un 'Like' previo en un margen de 7 días"
          sparkline={kpisMarketing.ventasAtribuidas.historico}
          variant="hero"
        />
        
        <div className="glass-card p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Ticket Promedio</h3>
                    <p className="text-xs text-muted-foreground mt-1">Digital vs Orgánico</p>
                </div>
                <CreditCard className="w-4 h-4 text-primary" />
            </div>
            
            <div className="mt-4 space-y-3">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Digital (Fans)</span>
                        <span className="font-bold text-success">S/ {kpisMarketing.ticketPromedioDigital.valor}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Orgánico (Promedio)</span>
                        <span className="font-bold text-foreground">S/ {kpisMarketing.ticketPromedioOrganico.valor}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary/50 rounded-full" style={{ width: `${(kpisMarketing.ticketPromedioOrganico.valor / kpisMarketing.ticketPromedioDigital.valor) * 100}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-2 text-xs text-success flex items-center gap-1">
                <span className="font-medium">+{((kpisMarketing.ticketPromedioDigital.valor - kpisMarketing.ticketPromedioOrganico.valor) / kpisMarketing.ticketPromedioOrganico.valor * 100).toFixed(1)}%</span>
                <span className="text-muted-foreground">mayor gasto en clientes digitales</span>
            </div>
        </div>
      </div>

      {/* Gráfico Central (Tendencia) */}
      <div className="w-full">
        <MarketingAttributionChart />
      </div>

      {/* Matriz de Rendimiento y Tabla de Detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <MarketingCampaignsChart />
        <MarketingStoresTable filters={filters} />
      </div>
    </div>
  );
};

export default MarketingView;
