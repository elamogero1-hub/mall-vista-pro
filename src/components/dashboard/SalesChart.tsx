import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ventasMensuales, formatCurrency, formatNumber, tiendas } from '@/data/mockData';
import { FilterState } from './FilterHeader';

interface SalesChartProps {
  filters: FilterState;
}

const SalesChart = ({ filters }: SalesChartProps) => {
  const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

  // Calcular proporción basada en filtros
  const filteredTiendas = useMemo(() => {
    return tiendas.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });
  }, [filters]);

  const proporcion = filteredTiendas.length / tiendas.length;

  const data = useMemo(() => {
    // Filtrar por fechas si existe rango
    let filteredVentasMensuales = [...ventasMensuales];

    if (filters.dateRange?.from && filters.dateRange?.to) {
      const from = filters.dateRange.from;
      const to = filters.dateRange.to;

      // Mapeo básico de nombres de meses en español a índices o fechas
      // Dado que mockData tiene strings como 'Ene 2025', haremos un filtrado simple
      // Convirtiendo el string del mes a fecha real para comparar
      const monthMap: Record<string, number> = {
        'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11
      };

      filteredVentasMensuales = ventasMensuales.filter(item => {
        const [mesStr, anioStr] = item.mes.split(' ');
        const itemDate = new Date(parseInt(anioStr), monthMap[mesStr], 1);

        // Comparar mes y año
        // Normalizamos las fechas de filtro al primer día del mes para comparación justa si es por mes
        // O usamos timestamps para rango completo
        return itemDate >= from && itemDate <= to;
      });
    }

    return filteredVentasMensuales.map((item, idx) => {
      // Aplicar proporción a los datos con variación mensual
      const variacion = 0.9 + Math.random() * 0.2; // Variación del 90% al 110%
      return {
        ...item,
        ventas: Math.round(item.ventas * proporcion * variacion),
        meta: Math.round(item.meta * proporcion),
        visitantes: Math.round(item.visitantes * proporcion * variacion),
        ventasM: (item.ventas * proporcion * variacion) / 1000000,
        metaM: (item.meta * proporcion) / 1000000,
      };
    });
  }, [proporcion, filters.dateRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Ventas:</span>
              <span className="text-xs font-medium text-foreground">
                {formatCurrency(payload[0]?.payload.ventas || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">Meta:</span>
              <span className="text-xs font-medium text-foreground">
                {formatCurrency(payload[0]?.payload.meta || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Visitantes:</span>
              <span className="text-xs font-medium text-foreground">
                {formatNumber(payload[0]?.payload.visitantes || 0)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Evolución de Ventas</h3>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? `Filtrado: ${filteredTiendas.length} tienda(s)` : 'Últimos 12 meses vs. meta'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Ventas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground/50" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">Meta</span>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickFormatter={(value) => `S/${value.toFixed(1)}M`}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={data.reduce((acc, d) => acc + d.metaM, 0) / data.length}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <Area
              type="monotone"
              dataKey="ventasM"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorVentas)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;