import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { traficoPorHora, formatNumber } from '@/data/mockData';

const TrafficHourlyChart = () => {
  const data = traficoPorHora;

  // Encontrar hora pico
  const peakHour = data.reduce((max, current) => 
    current.trafico > max.trafico ? current : max
  );

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
          <p className="text-sm text-muted-foreground">Patrón de afluencia del día típico</p>
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
              <linearGradient id="colorTrafico" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#colorTrafico)"
              animationDuration={1000}
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
