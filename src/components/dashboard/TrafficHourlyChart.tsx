import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { traficoPorHora, formatNumber, traficoZonas } from '@/data/mockData';
import { FilterState } from './FilterHeader';

interface TrafficHourlyChartProps {
  filters: FilterState;
}

const TrafficHourlyChart = ({ filters }: TrafficHourlyChartProps) => {
  const isFiltered = filters.zona !== 'todas';

  // Filtrar y ajustar datos según zona
  const data = useMemo(() => {
    if (!isFiltered) return traficoPorHora;

    // Calcular factor de reducción basado en zonas filtradas
    const filteredZonas = traficoZonas.filter(z =>
      z.zona.toLowerCase().includes(filters.zona.split(' - ')[0].toLowerCase()) ||
      filters.zona.toLowerCase().includes(z.zona.split(' ')[0].toLowerCase())
    );
    const factor = filteredZonas.length / traficoZonas.length;

    return traficoPorHora.map(t => ({
      ...t,
      trafico: Math.round(t.trafico * factor * (0.85 + Math.random() * 0.3))
    }));
  }, [filters.zona, isFiltered]);

  // Encontrar hora pico (protegido contra arrays vacíos)
  const peakHour = data.length > 0 ? data.reduce((max, current) =>
    current.trafico > max.trafico ? current : max
    , data[0]) : { hora: '00:00', trafico: 0 };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPeak = label === peakHour.hora;
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-1">
            {label} hrs
            {isPeak && <span className="ml-2 text-warning text-xs">⭐ Hora pico</span>}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Visitantes:</span>
            <span className="text-xs font-medium text-foreground">
              {formatNumber(payload[0].value)}
            </span>
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
          <h3 className="text-lg font-semibold text-foreground">Tráfico por Hora</h3>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? 'Patrón filtrado por zona' : 'Patrón de afluencia del día típico'}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
          <span className="text-xs text-warning font-medium">Hora Pico: {peakHour.hora}</span>
          <span className="text-xs text-muted-foreground">({formatNumber(peakHour.trafico)} visitantes)</span>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTraficoHourly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="hora"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="trafico"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              fill="url(#colorTraficoHourly)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Time segments */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Mañana (10-13h)</p>
          <p className="text-sm font-medium text-foreground">
            {formatNumber(data.slice(0, 4).reduce((sum, d) => sum + d.trafico, 0))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Tarde (14-18h)</p>
          <p className="text-sm font-medium text-foreground">
            {formatNumber(data.slice(4, 9).reduce((sum, d) => sum + d.trafico, 0))}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Noche (19-22h)</p>
          <p className="text-sm font-medium text-foreground">
            {formatNumber(data.slice(9).reduce((sum, d) => sum + d.trafico, 0))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficHourlyChart;