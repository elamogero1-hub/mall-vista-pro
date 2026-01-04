import { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  ReferenceLine,
  Cell,
} from 'recharts';
import { tiendas, formatCurrency, formatNumber } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const EfficiencyScatterChart = () => {
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  const categoryColors: Record<string, string> = {
    'Moda': 'hsl(var(--primary))',
    'Restaurantes': 'hsl(var(--warning))',
    'Electrónica': 'hsl(var(--chart-3))',
    'Entretenimiento': 'hsl(var(--success))',
    'Hogar': 'hsl(var(--chart-4))',
    'Belleza': 'hsl(340 80% 60%)',
    'Deportes': 'hsl(199 89% 60%)',
    'Servicios': 'hsl(var(--muted-foreground))',
  };

  const data = tiendas
    .filter(t => t.ventas > 0)
    .map((tienda) => ({
      ...tienda,
      ventasK: tienda.ventas / 1000,
      traficoK: tienda.trafico / 1000,
    }));

  // Calcular promedios para las líneas de referencia
  const avgTrafico = data.reduce((sum, t) => sum + t.trafico, 0) / data.length;
  const avgVentas = data.reduce((sum, t) => sum + t.ventas, 0) / data.length;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const store = payload[0].payload;
      const isAncla = store.trafico > avgTrafico && store.ventas > avgVentas;
      const isIneficiente = store.trafico > avgTrafico && store.ventas < avgVentas;
      
      return (
        <div className="glass-card p-4 border border-border/50 min-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">{store.nombre}</p>
            {isAncla && (
              <Badge className="bg-success/20 text-success text-[10px] border-0">Ancla</Badge>
            )}
            {isIneficiente && (
              <Badge className="bg-warning/20 text-warning text-[10px] border-0">Revisar</Badge>
            )}
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Categoría:</span>
              <span 
                className="font-medium px-1.5 py-0.5 rounded"
                style={{ 
                  backgroundColor: `${categoryColors[store.categoria]}20`,
                  color: categoryColors[store.categoria]
                }}
              >
                {store.categoria}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ventas:</span>
              <span className="font-medium text-foreground">{formatCurrency(store.ventas)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tráfico:</span>
              <span className="font-medium text-foreground">{formatNumber(store.trafico)} visitas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Área:</span>
              <span className="font-medium text-foreground">{store.m2} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conversión:</span>
              <span className="font-medium text-foreground">{store.conversion.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Matriz Tráfico vs Ventas</h3>
          <p className="text-sm text-muted-foreground">Identificación de tiendas Ancla e Ineficientes</p>
        </div>
      </div>

      {/* Quadrant Labels */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-success font-medium">Alto Tráfico + Alta Venta = Ancla</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-warning/10">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-warning font-medium">Alto Tráfico + Baja Venta = Ineficiente</span>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              dataKey="trafico"
              name="Tráfico"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              label={{ 
                value: 'Tráfico (visitantes)', 
                position: 'bottom', 
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 11,
                offset: 0
              }}
            />
            <YAxis
              type="number"
              dataKey="ventas"
              name="Ventas"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `S/${(value / 1000).toFixed(0)}K`}
              label={{ 
                value: 'Ventas (S/)', 
                angle: -90, 
                position: 'insideLeft',
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 11,
                offset: 10
              }}
            />
            <ZAxis 
              type="number" 
              dataKey="m2" 
              range={[50, 400]} 
              name="Área"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for quadrants */}
            <ReferenceLine 
              x={avgTrafico} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <ReferenceLine 
              y={avgVentas} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            
            <Scatter 
              name="Tiendas" 
              data={data}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={categoryColors[entry.categoria] || 'hsl(var(--primary))'}
                  stroke={hoveredStore === entry.nombre ? 'hsl(var(--foreground))' : 'transparent'}
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredStore(entry.nombre)}
                  onMouseLeave={() => setHoveredStore(null)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EfficiencyScatterChart;
